import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MerchantDto } from './merchant.dto';
import { MerchantUpdateDto } from './merchant-update.dto';
import { Merchant, MerchantDocument } from './merchant.schema';
import { UserService } from '../user/user.service'

@Injectable()
export class MerchantService {

  constructor(
    @InjectModel(Merchant.name) private readonly merchantModel: Model<MerchantDocument>,
    private userService: UserService
  ) {}

  async create(createMerchantDto: MerchantDto):  Promise<Merchant> {
    const newMerchant = new this.merchantModel(createMerchantDto);
    return await newMerchant.save();
  }

  async findAll(): Promise<Merchant[]> {
    return await this.merchantModel.find().exec();
  }

  async findOne(id: string): Promise<Merchant> {
    return await this.merchantModel.findById(id).populate('user').populate('service');
  }

  async findByName(name: string): Promise<Merchant[]> {
    return await this.merchantModel.find({name: new RegExp(name, "i")}).exec();
  }

  async update(id: string, merchantUpdateDto: MerchantUpdateDto) {
    const merchantUpdate = new this.merchantModel(merchantUpdateDto);
    this.merchantModel.findByIdAndUpdate(id, merchantUpdate, {new:true});
    return await this.userService.update(merchantUpdateDto.user, merchantUpdateDto);
    
  }

  async remove(id: string) {
    return await this.merchantModel.findByIdAndRemove(id);
  }
}
