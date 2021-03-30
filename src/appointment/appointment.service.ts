import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceService } from '../service/service.service';
import { AppointmentDto } from './appointment.dto';
import { Appointment, AppointmentDocument } from './appointment.schema';

@Injectable()
export class AppoitmentService implements OnModuleInit {
  
  private serviceService: ServiceService;

  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
    private moduleRef: ModuleRef
  ) {}

  onModuleInit() {
    this.serviceService = this.moduleRef.get(ServiceService, { strict: false });
  }

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
    return await this.appointmentModel.find({ customer: id }).populate('service').exec();
  }

  async findByMerchant(id: string) {
    return await this.appointmentModel.find({ merchant: id }).populate('service').populate({path:'merchant', populate:{path: 'user'}}).exec();
  }

  
  async findByServiceCurrentDate(id: string) {
    const [month, date, year] = new Date().toLocaleDateString("en-US").split("/")  
    const currentDate: Date = new Date(+year,+month-1, +date)
    const weekDate: Date = new Date(currentDate)
    weekDate.setDate(currentDate.getDate()+7)
    
    return await this.appointmentModel.find({ service: id,  date: {$gte: currentDate, $lt: weekDate}}).populate('service').populate({path:'merchant', populate:{path: 'user'}}).exec();
  }

  async findByCustomerToken(user: any): Promise<any> {
    // let appointment = await this.appointmentModel.find({ customer: user.userId }).populate('service').exec() as any
    // const nappointment = await Promise.all(appointment.map(async app => {
    //   const merchant = await this.merchantService.findBy({ user: Types.ObjectId(app.merchant) });
    //   app.merchant = merchant
    //   return app
    // }))
    // return nappointment

    return await this.appointmentModel.find({customer: user.userId}).populate('service').populate({path:'merchant', populate:{path: 'user'}}).exec()
  }

  async findByCustomerDate(id: string, date: Date) {
    return this.appointmentModel.find({ customer: id, date: date }).exec();
  }

  async findByServiceLastToken(id: string, date: Date) {
    return this.appointmentModel.findOne({ service: id, date}).sort('-created_at').exec();
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
