import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MerchantDto } from './merchant.dto';
import { MerchantUpdateDto } from './merchant-update.dto';
import { Merchant, MerchantDocument } from './merchant.schema';
import { UserService } from '../user/user.service';
const querystring = require('querystring');

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel(Merchant.name)
    private readonly merchantModel: Model<MerchantDocument>,
    private userService: UserService,
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
    return await this.merchantModel.find().populate('user').exec();
  }

  async findOne(id: string): Promise<Merchant> {
    return await this.merchantModel.findById(id).populate('user');
  }

  async update(id: string, merchantUpdateDto: MerchantUpdateDto) {
    const merchantUpdate = new this.merchantModel(merchantUpdateDto);
    this.merchantModel.findByIdAndUpdate(id, merchantUpdate, { new: true });
    return await this.userService.update(
      merchantUpdateDto.user,
      merchantUpdateDto,
    );
  }
  async remove(id: string) {
    return await this.merchantModel.findByIdAndRemove(id);
  }
}
