import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDto } from './customer.dto';
import { Customer, CustomerDocument } from './customer.schema';

@Injectable()
export class CustomerService {
  constructor( @InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument> ) {}

  async create(createCustomerDto: CustomerDto): Promise<Customer> {
    const newCustomer = new this.customerModel(createCustomerDto);
    return await newCustomer.save();
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerModel.find().exec();
  }

  async findOne(id: string) {
    return await this.customerModel.find({userId:id}).exec();
  }

  async update(id: string, updateCustomerDto: CustomerDto) {
    const updateCustomer = new this.customerModel(updateCustomerDto);
    return await this.customerModel.findByIdAndUpdate(id, updateCustomer, {new: true});
  }

  async remove(id: string) {
    return await this.customerModel.findByIdAndRemove(id);
  }
}
