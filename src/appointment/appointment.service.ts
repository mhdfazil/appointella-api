import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppointmentDto } from './appointment.dto';
import { Appointment, AppointmentDocument } from './appointment.schema';

@Injectable()
export class AppoitmentService {

  constructor( @InjectModel(Appointment.name) private readonly appointmentModel: Model<AppointmentDocument> ) {}

  async create(createAppoitmentDto: AppointmentDto) {
    const appointment = new this.appointmentModel(createAppoitmentDto);
    return await appointment.save();
  }

  async findAll() {
    return this.appointmentModel.find();
  }

  async findOne(id: string) {
    return this.appointmentModel.findOne({ _id: id });
  }

  async findByCustomer(id: string) {
    return this.appointmentModel.find({ customer: id }).exec();
  }

  async findByCustomerDate(id: string, date: string) {
    return this.appointmentModel.find({ customer: id, date: date }).exec();
  }

  async update(id: string, appoitmentDto: AppointmentDto) {
    return await this.appointmentModel.findByIdAndUpdate(id, appoitmentDto, { new: true });
  }

  async remove(id: string) {
    return await this.appointmentModel.findByIdAndRemove(id);
  }

}
