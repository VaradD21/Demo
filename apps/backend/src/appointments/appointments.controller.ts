import { Controller, Post, Get, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // Public — doctor listing for booking page
  @Get('doctors')
  async getDoctors(@Query('specialty') specialty?: string) {
    return this.appointmentsService.getDoctors(specialty);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async book(
    @Request() req: any,
    @Body() body: { patientName: string; location: string; preferredTime: string; doctorId?: string; notes?: string },
  ) {
    return this.appointmentsService.bookAppointment(
      req.user.userId,
      body.patientName,
      body.location,
      body.preferredTime,
      body.doctorId,
      body.notes,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAppointments(@Request() req: any) {
    return this.appointmentsService.getUserAppointments(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async cancel(@Request() req: any, @Param('id') id: string) {
    return this.appointmentsService.cancelAppointment(req.user.userId, id);
  }
}
