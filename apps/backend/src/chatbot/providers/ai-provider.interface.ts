export interface AIService {
  generateResponse(messages: { role: 'user' | 'assistant' | 'system', content: string }[], usePremiumModel?: boolean): Promise<string>;
}
