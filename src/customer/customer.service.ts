import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from '../user/user.service';
import { CustomerUpdateDto } from './customer-update.dto';
import { CustomerDto } from './customer.dto';
import { Customer, CustomerDocument } from './customer.schema';


@Injectable()
export class CustomerService implements OnModuleInit {

  private userService: UserService

  constructor( 
    @InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>,
    private moduleRef: ModuleRef
  ) {}

  onModuleInit() {
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

  async create(createCustomerDto: CustomerDto): Promise<Customer> {
    const newCustomer = new this.customerModel(createCustomerDto);
    return await newCustomer.save();
  }

  async findAll(filter: string): Promise<Customer[]> {
    if (filter) {
      const value = Object.values(JSON.parse(filter)).toString();
      const key = Object.keys(JSON.parse(filter))[0];

      return await this.customerModel
        .find()
        .where(key, new RegExp(value, 'i'))
        .populate('user')
        .exec();
    }
    return await this.customerModel.find().populate('user').exec();
  }

  async findOne(id: string) {
    return await this.customerModel.findById(id).populate('user');
  }

  async findBy(attr) {
    return await this.customerModel.findOne(attr).populate('user');
  }

  async findMe(user: any) {
    return await this.customerModel.findById(user.userId).populate('user').exec();
  }

  async findByName(firstName: string): Promise<Customer[]> {
    const customer =  await this.customerModel.find({ firstName }).exec();
    if(customer.length < 1)
      throw new NotFoundException("Customers not found");
    
    return customer;  
  }

  async update(id: string, customerUpdateDto: CustomerUpdateDto, image: Express.Multer.File) {
    const customer = await this.customerModel.findByIdAndUpdate(id, customerUpdateDto, {new: true});
    const user = await this.userService.update(customer.user.toString(), customerUpdateDto, image);
    return {user, customer};
  }

  async remove(id: string) {
    return await this.customerModel.findByIdAndRemove(id);
  }
}
