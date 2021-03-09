import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceDto } from './service.dto';
import { Service, ServiceDocument } from './service.schema';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
  ) {}

  async create(ServiceDto: ServiceDto) {
    const Service = new this.serviceModel(ServiceDto);
    return await Service.save();
  }

  async findAll(filter: string) {
    if (filter) {
      const value = Object.values(JSON.parse(filter)).toString();
      const key = Object.keys(JSON.parse(filter))[0];

      return await this.serviceModel
        .find()
        .where(key, new RegExp(value, 'i'))
        .populate('merchant')
        .exec();
    }
    return await this.serviceModel.find().populate('merchant').exec();
  }

  async findOne(id: string) {
    return this.serviceModel.findOne({ _id: id });
  }

  async update(id: string, service: Service) {
    return await this.serviceModel.findByIdAndUpdate(id, service, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.serviceModel.findByIdAndRemove(id);
  }
}
