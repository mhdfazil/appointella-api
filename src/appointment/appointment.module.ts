import { Module } from '@nestjs/common';
import { AppoitmentService } from './appointment.service';
import { AppoitmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './appointment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }])],
  controllers: [AppoitmentController],
  providers: [AppoitmentService]
})
export class AppointmentModule {}
