import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return (this.prisma as any).user.findMany();
  }

  async create(data: { email: string; name?: string; password?: string }) {
    return (this.prisma as any).user.create({ data });
  }
}
