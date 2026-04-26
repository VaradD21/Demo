import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('questionnaire')
@UseGuards(JwtAuthGuard)
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post()
  async submit(@Request() req: any, @Body() body: { score: number; feedback: string; answers: any }) {
    return this.questionnaireService.submitResult(req.user.userId, body.score, body.feedback, body.answers);
  }

  @Get()
  async getResults(@Request() req: any) {
    return this.questionnaireService.getUserResults(req.user.userId);
  }
}
