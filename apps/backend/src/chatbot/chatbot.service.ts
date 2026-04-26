import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GeminiProvider } from './providers/gemini.provider';

const SYSTEM_PROMPT = `You are Swahit AI Companion, a warm, calm, emotionally intelligent, and deeply empathetic wellness assistant.
Your tone is soft, thoughtful, and non-judgmental. You provide concise but caring responses, prioritizing the user's emotional safety.
You help users with reflection, stress management, grounding, reframing thoughts, and emotional awareness.

CRITICAL RULES:
- Do NOT shame, guilt, or sound robotic.
- Do NOT pretend to be a doctor, diagnose, or claim to hold a therapy license.
- CRISIS PROTOCOL: If the user expresses intent for self-harm, suicide, or severe crisis, respond with grounding, supportive language and IMMEDIATELY recommend they contact emergency services or a crisis hotline. Remind them they are not alone.
- Keep responses conversational. Avoid over-clinical style, excessive markdown, or long bulleted lists unless explicitly asked.

ESCALATION GUIDANCE:
- If the user describes recurring stress, persistent sadness, difficulty functioning, anxiety affecting daily life, relationship problems, or burnout that has lasted more than 2 weeks:
  Gently and naturally suggest (without pressure): "Speaking with a licensed professional may offer deeper support. Swahit can connect you with one if you'd like."
- Phrase it warmly: never robotic, never pushy.
- Only suggest once per relevant pattern — do not repeat if user declines.`;

const DISTRESS_KEYWORDS = [
  'can\'t sleep', 'can\'t eat', 'hopeless', 'worthless', 'can\'t cope', 'panic attack',
  'breakdown', 'end my life', 'harm myself', 'no point', 'give up', 'exhausted',
  'overwhelmed', 'depressed', 'anxious all the time', 'crying every day', 'suicidal'
];

const SYNC_PROMPT = `You are an AI assistant summarizing a therapy-style conversation. 
Please read the following conversation log and provide a concise summary of the key emotional themes, new stressors discussed, and any positive habits mentioned. 
Return ONLY the summary text, nothing else. Keep it under 4 sentences.`;

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);

  constructor(
    private prisma: PrismaService,
    private aiProvider: GeminiProvider // Using Gemini Flash as standard
  ) {}

  async sendMessage(userId: string, sessionId: string | null, content: string) {
    let session;
    if (sessionId) {
      session = await this.prisma.chatSession.findUnique({ where: { id: sessionId } });
    }
    
    if (!session) {
      session = await this.prisma.chatSession.create({
        data: { userId, title: 'New Conversation' },
      });
    }

    const memory = await this.prisma.userMemoryProfile.findUnique({ where: { userId } });

    await this.prisma.chatMessage.create({
      data: { sessionId: session.id, role: 'user', content },
    });

    const recentMessages = await this.prisma.chatMessage.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: 'asc' },
      take: 20, // Keep context window reasonable
    });

    let memoryContext = "No prior memory profile available.";
    if (memory) {
      memoryContext = `User Context:
Preferred Name: ${memory.preferredName || 'Unknown'}
Goals: ${memory.goals || 'None recorded'}
Stressors: ${memory.recurringStressors || 'None recorded'}
Recent Summaries: ${memory.recentSummaries || 'None'}`;
    }

    const messagesToProvider: any[] = [
      { role: 'system', content: `${SYSTEM_PROMPT}\n\n${memoryContext}` },
      ...recentMessages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }))
    ];

    let aiResponseContent = "I'm having trouble thinking right now, but I'm here for you.";
    try {
      // For premium users, we could pass true here: aiProvider.generateResponse(..., user.isPremium)
      aiResponseContent = await this.aiProvider.generateResponse(messagesToProvider, false);
    } catch (e) {
      this.logger.error('Failed to generate response', e);
    }

    const aiMessage = await this.prisma.chatMessage.create({
      data: { sessionId: session.id, role: 'ai', content: aiResponseContent },
    });

    // Detect distress to suggest professional help
    const userContentLower = content.toLowerCase();
    const hasDistressSignal = DISTRESS_KEYWORDS.some(k => userContentLower.includes(k));
    let suggestProfessional = false;
    if (hasDistressSignal) {
      suggestProfessional = true;
      // Update distress count in memory profile asynchronously
      this.prisma.userMemoryProfile.upsert({
        where: { userId },
        create: { userId, distressCount: 1, lastDistressAt: new Date() },
        update: { distressCount: { increment: 1 }, lastDistressAt: new Date() },
      }).catch(() => {});
    }

    // Trigger Memory Sync asynchronously every 15 messages
    const messageCount = await this.prisma.chatMessage.count({ where: { sessionId: session.id } });
    if (messageCount > 0 && messageCount % 15 === 0) {
      this.triggerMemorySync(session.id, userId).catch(err =>
        this.logger.error('Background Memory Sync Failed', err)
      );
    }

    return { session, message: aiMessage, suggestProfessional };
  }

  /**
   * Background worker method to summarize long conversations and update the memory profile.
   */
  private async triggerMemorySync(sessionId: string, userId: string) {
    this.logger.log(`Triggering Memory Sync for session ${sessionId}`);
    
    const allMessages = await this.prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: 50, // Summarize the last 50 messages to stay within reasonable limits
    });

    if (allMessages.length < 5) return;

    const conversationLog = allMessages.map(m => `${m.role === 'user' ? 'User' : 'Swahit'}: ${m.content}`).join('\n');
    
    try {
      const summaryContent = await this.aiProvider.generateResponse([
        { role: 'system', content: SYNC_PROMPT },
        { role: 'user', content: conversationLog }
      ], false); // Use Flash for quick internal tasks

      // 1. Save to ChatSummary
      await this.prisma.chatSummary.create({
        data: {
          sessionId,
          summary: summaryContent,
        }
      });

      // 2. Append to UserMemoryProfile
      const existingMemory = await this.prisma.userMemoryProfile.findUnique({ where: { userId } });
      const newRecentSummaries = existingMemory?.recentSummaries 
        ? `${existingMemory.recentSummaries}\n- ${summaryContent}`.slice(-1000) // Keep last ~1000 chars
        : `- ${summaryContent}`;

      await this.prisma.userMemoryProfile.upsert({
        where: { userId },
        create: {
          userId,
          recentSummaries: newRecentSummaries,
        },
        update: {
          recentSummaries: newRecentSummaries,
        }
      });

      this.logger.log(`Memory Sync complete for session ${sessionId}`);
    } catch (error) {
      this.logger.error('Failed to run memory sync', error);
    }
  }

  async getThreads(userId: string) {
    return this.prisma.chatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, updatedAt: true, createdAt: true, userId: true },
    });
  }

  async getThreadHistory(userId: string, sessionId: string) {
    return this.prisma.chatMessage.findMany({
      where: { session: { id: sessionId, userId } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async deleteThread(userId: string, sessionId: string) {
    return this.prisma.chatSession.delete({
      where: { id: sessionId, userId },
    });
  }

  async listAvailableModels() {
    return this.aiProvider.listModels();
  }
}
