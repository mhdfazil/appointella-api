import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceService } from '../service/service.service';
import { UserService } from '../user/user.service';
import { MerchantUpdateDto } from './merchant-update.dto';
import { MerchantDto } from './merchant.dto';
import { Merchant, MerchantDocument } from './merchant.schema';

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel(Merchant.name)
    private readonly merchantModel: Model<MerchantDocument>,
    private userService: UserService,
    private serviceService: ServiceService,
  ) {}

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
    // return '{'+stringify({ id: merchant[0].id })+'}';
    // const services =  await this.serviceService.findAll('{'+stringify({ id: merchant[0].id })+'}');
    // return {merchant, services};
    const services = await this.serviceService.findByMerchantId(merchant[0].id);

    return { merchant, services };
  }

  async findOne(id: string): Promise<Merchant> {
    return await this.merchantModel.findById(id).populate('user');
  }

  async findBy(attr: any): Promise<Merchant> {
    console.log("_ID", attr);    
    return await this.merchantModel.findOne(attr).populate('user');
  }

  async update(id: string, merchantUpdateDto: MerchantUpdateDto) {
    const merchant = await this.merchantModel.findByIdAndUpdate(
      id,
      merchantUpdateDto,
      { new: true },
    );
    const user = this.userService.update(
      merchantUpdateDto.user,
      merchantUpdateDto,
    );
    
    return {...user, ...merchant};
  }
  async remove(id: string) {
    return await this.merchantModel.findByIdAndRemove(id);
  }
}
