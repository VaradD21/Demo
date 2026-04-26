import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { MoodService } from './mood.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('mood')
@UseGuards(JwtAuthGuard)
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Post()
  async logMood(
    @Request() req: any,
    @Body() body: { mood: string; intensity?: number; notes?: string },
  ) {
    return this.moodService.createMood(req.user.userId, body.mood, body.intensity ?? 5, body.notes);
  }

  @Get()
  async getMoods(@Request() req: any) {
    return this.moodService.getUserMoods(req.user.userId);
  }
}
