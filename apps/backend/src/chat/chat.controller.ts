import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async sendMessage(@Request() req: any, @Body() body: { content: string }) {
    return this.chatService.sendMessage(req.user.userId, body.content);
  }

  @Get('history')
  async getHistory(@Request() req: any) {
    return this.chatService.getChatHistory(req.user.userId);
  }
}
