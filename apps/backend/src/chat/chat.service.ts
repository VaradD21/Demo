import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(userId: string, content: string) {
    // 1. Find or create a session for today (simplified to just getting latest or creating one)
    let session = await this.prisma.chatSession.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!session) {
      session = await this.prisma.chatSession.create({
        data: { userId },
      });
    }

    // 2. Save user message
    await this.prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'user',
        content,
      },
    });

    // 3. Simulated AI Response logic (Replace with real LLM integration later)
    const aiResponseContent = this.generateSimulatedResponse(content);
    
    // 4. Save AI message
    const aiMessage = await this.prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: 'ai',
        content: aiResponseContent,
        emotionTag: 'Supportive',
      },
    });

    return aiMessage;
  }

  async getChatHistory(userId: string) {
    const session = await this.prisma.chatSession.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    return session?.messages || [];
  }

  private generateSimulatedResponse(input: string): string {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('sad') || lowerInput.includes('down')) {
      return "I'm really sorry you're feeling this way. It takes courage to admit that. I'm here for you.";
    }
    if (lowerInput.includes('anxious') || lowerInput.includes('worry')) {
      return "Anxiety can be really overwhelming. Let's take a deep breath together. What's on your mind?";
    }
    return "I hear you. Thank you for sharing that with me. How can I best support you today?";
  }
}
