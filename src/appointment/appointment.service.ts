import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AppointmentDto } from './appointment.dto';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { ServiceService } from '../service/service.service';
import { exec } from 'child_process';
import { MerchantService } from 'src/merchant/merchant.service';
import { Merchant } from 'src/merchant/merchant.schema';

@Injectable()
export class AppoitmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
    private serviceService: ServiceService,
    private merchantService: MerchantService
  ) {}

  async create(createAppoitmentDto: AppointmentDto) {
    if (createAppoitmentDto.startTime) {
      const appointment = new this.appointmentModel(createAppoitmentDto);
      const service = await this.serviceService.findOne(
        appointment.service.toString(),
      );
      appointment.endTime = new Date(
        appointment.startTime.getTime() + service.duration * 60000,
      );
      return await appointment.save();
    }
    const appointment = new this.appointmentModel(createAppoitmentDto);
    return await appointment.save();
  }

  async findAll() {
    return await this.appointmentModel.find();
  }

  async findOne(id: string) {
    return await this.appointmentModel.findOne({ _id: id });
  }

  async findByCustomer(id: string) {
    return await this.appointmentModel.find({ customer: id }).exec();
  }

  async findByMerchant(id: string) {
    return await this.appointmentModel.find({ merchant: id }).exec();
  }

  async findByCustomerToken(user: any) {
    let appointment = await this.appointmentModel.find({ customer: user.userId }).populate('service').exec() as any
    await appointment.map(async app => {
      const merchant = await this.merchantService.findBy({ user: app.merchant })
      console.log("merchant",merchant);
      app = {
        ...app,
        merchant
      }
    })
   
    return appointment
  }

  async findByCustomerDate(id: string, date: Date) {
    return this.appointmentModel.find({ customer: id, date: date }).exec();
  }

  async update(id: string, appoitmentDto: AppointmentDto) {
    return await this.appointmentModel.findByIdAndUpdate(id, appoitmentDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.appointmentModel.findByIdAndRemove(id);
  }
}
