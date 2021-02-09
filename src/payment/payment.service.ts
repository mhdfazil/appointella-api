import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentDto } from './payment.dto';
import { Payment, PaymentDocument } from './payment.schema';

@Injectable()
export class PaymentService {
  constructor( @InjectModel(Payment.name) private readonly paymentModel: Model<PaymentDocument> ) {}

  async create(PaymentDto: PaymentDto) {
    const Payment = new this.paymentModel(PaymentDto);
    return await Payment.save();
  }

  async findAll() {
    return this.paymentModel.find();
  }

  async findOne(id: number) {
    return this.paymentModel.findOne({ _id: id });
  }

  async update(id: number, Payment: Payment) {
    return await this.paymentModel.findByIdAndUpdate(id, Payment, { new: true });
  }

  async remove(id: number) {
    return await this.paymentModel.findByIdAndRemove(id);
  }
}
