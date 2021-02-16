import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MerchantDto } from './merchant.dto';
import { Merchant, MerchantDocument } from './merchant.schema';

@Injectable()
export class MerchantService {

  constructor(@InjectModel(Merchant.name) private readonly merchantModel: Model<MerchantDocument>) {}

  async create(createMerchantDto: MerchantDto):  Promise<Merchant> {
    const newMerchant = new this.merchantModel(createMerchantDto);
    return await newMerchant.save();
  }

  async findAll(): Promise<Merchant[]> {
    return await this.merchantModel.find().exec();
  }

  async findOne(id: string): Promise<Merchant> {
    return await this.merchantModel.findOne({ userId: id }).exec();
  }

  async update(id: string, updateMerchantDto: MerchantDto) {
    const updateMerchant = new this.merchantModel(updateMerchantDto);
    return await this.merchantModel.findByIdAndUpdate(id, updateMerchant, {new:true});
  }

  async remove(id: string) {
    return await this.merchantModel.findByIdAndRemove(id);
  }
}
