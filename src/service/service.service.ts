import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppoitmentService } from '../appointment/appointment.service';
import { ServiceDto } from './service.dto';
import { Service, ServiceDocument } from './service.schema';


@Injectable()
export class ServiceService implements OnModuleInit {
  
  private appoitmentService: AppoitmentService;

  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
    private moduleRef: ModuleRef
  ) {}

  onModuleInit() {
    this.appoitmentService = this.moduleRef.get(AppoitmentService, { strict: false });
  }

  async create(ServiceDto: ServiceDto) {
    const Service = new this.serviceModel(ServiceDto);
    return await Service.save();
  }

  async findAll(filter: string) {
    if (filter) {
      const value = Object.values(JSON.parse(filter)).toString();
      const key = Object.keys(JSON.parse(filter))[0];

      return await this.serviceModel
        .find({ deleted: false })
        .where(key, new RegExp(value, 'i'))
        .populate('merchant')
        .exec();
    }
    return await this.serviceModel.find({ deleted: false }).populate('merchant').exec();
  }

  async findOne(id: string) {
    return this.serviceModel.findOne({ _id: id, deleted: false });
  }

  async findToken(id: string, date: Date) {
    let token
    token = await this.appoitmentService.findByServiceLastToken(id, date);
    const service = await this.serviceModel.findById(id).populate('merchant') as any;

    if(service.type != 'number')
      throw new BadRequestException('Invalid service type.')

    const maxCount = service.maxCount;
    const duration = service.duration;
    const startTime: Date = service.merchant.openTime;

    // if(appointment)
    //   token = appointment.token
    // else
    //   token = 0
    console.log({token});
    
    if(token >= maxCount)
      throw new BadRequestException('No booking available')

    const time = new Date(startTime.getTime() + duration * token * 60000)

    token = token + 1
    
    return {token, time};
  }

  async update(id: string, service: Service) {
    return await this.serviceModel.findByIdAndUpdate(id, service, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.serviceModel.findByIdAndUpdate(id, { deleted: true });
  }
}
