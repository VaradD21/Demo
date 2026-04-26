import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async getDoctors(specialty?: string) {
    return this.prisma.doctor.findMany({
      where: {
        isAvailable: true,
        ...(specialty ? { specialty } : {}),
      },
      orderBy: { rating: 'desc' },
      select: {
        id: true,
        name: true,
        specialty: true,
        bio: true,
        avatarUrl: true,
        rating: true,
        reviewCount: true,
        yearsExp: true,
        languages: true,
        consultFee: true,
      },
    });
  }

  async bookAppointment(
    userId: string,
    patientName: string,
    location: string,
    preferredTime: string,
    doctorId?: string,
    notes?: string,
  ) {
    return this.prisma.appointment.create({
      data: {
        userId,
        patientName,
        location,
        preferredTime,
        ...(doctorId ? { doctorId } : {}),
        ...(notes ? { notes } : {}),
      },
      include: { doctor: { select: { name: true, specialty: true } } },
    });
  }

  async getUserAppointments(userId: string) {
    return this.prisma.appointment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { doctor: { select: { name: true, specialty: true, avatarUrl: true } } },
    });
  }

  async cancelAppointment(userId: string, appointmentId: string) {
    return this.prisma.appointment.updateMany({
      where: { id: appointmentId, userId },
      data: { status: 'CANCELLED' },
    });
  }
}
