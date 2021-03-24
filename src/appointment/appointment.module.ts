import { Module } from '@nestjs/common';
import { AppoitmentService } from './appointment.service';
import { AppoitmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './appointment.schema';
import { ServiceModule } from '../service/service.module';
import { MerchantModule } from 'src/merchant/merchant.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    ServiceModule,
    MerchantModule
  ],
  controllers: [AppoitmentController],
  providers: [AppoitmentService],
})
export class AppointmentModule {}
