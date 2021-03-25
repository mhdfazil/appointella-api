import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceService } from '../service/service.service';
import { UserService } from '../user/user.service';
import { MerchantUpdateDto } from './merchant-update.dto';
import { MerchantDto } from './merchant.dto';
import { Merchant, MerchantDocument } from './merchant.schema';

@Injectable()
export class MerchantService implements OnModuleInit {
  
  private userService: UserService

  constructor(
    @InjectModel(Merchant.name)
    private readonly merchantModel: Model<MerchantDocument>,
    private serviceService: ServiceService,
    private moduleRef: ModuleRef
  ) {}
  
  onModuleInit() {
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

  async create(createMerchantDto: MerchantDto): Promise<Merchant> {
    const newMerchant = new this.merchantModel(createMerchantDto);
    return await newMerchant.save();
  }

  async findAll(filter: string): Promise<Merchant[]> {
    if (filter) {
      const value = Object.values(JSON.parse(filter)).toString();
      const key = Object.keys(JSON.parse(filter))[0];

      return await this.merchantModel
        .find()
        .where(key, new RegExp(value, 'i'))
        .populate('user')
        .exec();
    }
    return this.merchantModel.find().populate('user').exec();
  }

  async findServices(filter: string) {
    const value = Object.values(JSON.parse(filter)).toString();
    const key = Object.keys(JSON.parse(filter))[0];
    const merchant = await this.merchantModel
      .find()
      .where(key, new RegExp(value, 'i'))
      .populate('user')
      .exec();
    const services = await this.serviceService.findByMerchantId(merchant[0].id);

    return { merchant, services };
  }

  async findOne(id: string): Promise<Merchant> {
    return await this.merchantModel.findById(id).populate('user');
  }

  async findBy(attr: any): Promise<any> {
    return await this.merchantModel.findOne(attr).populate('user');
  }

  async update(id: string, merchantUpdateDto: MerchantUpdateDto, image: Express.Multer.File) {
    const merchant = await this.merchantModel.findByIdAndUpdate(
      id,
      merchantUpdateDto,
      { new: true },
    );
    const user = await this.userService.update(
      merchantUpdateDto.user,
      merchantUpdateDto,
      image
    );
    
    return {...user, ...merchant};
  }
  async remove(id: string) {
    return await this.merchantModel.findByIdAndRemove(id);
  }
}
