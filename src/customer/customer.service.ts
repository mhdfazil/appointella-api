import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDto } from './customer.dto';
import { CustomerUpdateDto } from './customer-update.dto';
import { Customer, CustomerDocument } from './customer.schema';
import { UserService } from '../user/user.service'


@Injectable()
export class CustomerService {
  constructor( @InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>,
  private userService: UserService
   ) {}

  async create(createCustomerDto: CustomerDto): Promise<Customer> {
    const newCustomer = new this.customerModel(createCustomerDto);
    return await newCustomer.save();
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerModel.find().exec();
  }

  async findOne(id: string) {
    return await this.customerModel.findById(id).populate('user');
  }

  async findByName(firstName: string): Promise<Customer[]> {
    const customer =  await this.customerModel.find({ firstName }).exec();
    if(customer.length < 1)
      throw new NotFoundException("Customers not found");
    
    return customer;  
  }

  async update(id: string, customerUpdateDto: CustomerUpdateDto) {
    const customerUpdate = new this.customerModel(customerUpdateDto);
    this.customerModel.findByIdAndUpdate(id, customerUpdate, {new: true});
    return await this.userService.update(customerUpdateDto.user, customerUpdateDto);
  }

  async remove(id: string) {
    return await this.customerModel.findByIdAndRemove(id);
  }
}
