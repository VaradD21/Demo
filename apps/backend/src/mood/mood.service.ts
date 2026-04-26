import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MoodService {
  constructor(private prisma: PrismaService) {}

  async createMood(userId: string, mood: string, intensity: number = 5, notes?: string) {
    return this.prisma.moodEntry.create({
      data: { userId, mood, intensity, notes },
    });
  }

  async getUserMoods(userId: string) {
    return this.prisma.moodEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 30,
    });
  }
}
