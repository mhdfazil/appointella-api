import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppoitmentController } from './appointment.controller';
import { Appointment, AppointmentSchema } from './appointment.schema';
import { AppoitmentService } from './appointment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
  ],
  controllers: [AppoitmentController],
  providers: [AppoitmentService],
  exports: [AppoitmentService]
})
export class AppointmentModule {}
