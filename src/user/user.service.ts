import { BadRequestException, forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CustomerService } from 'src/customer/customer.service';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
;

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private customerService: CustomerService,
    private configService: ConfigService,
  ) {}

  async create(user: User): Promise<any> {
    const hash = await bcrypt.hash(user.password, parseInt(this.configService.get<string>('SALT_ROUND')));
    user.password = hash;

    const newuser = new this.userModel(user);

    try {
      const savedUser = await newuser.save();
      if(user.type === 'customer') {
        this.customerService.create({ user: savedUser._id })
      }
      return {
        id: savedUser.id,
        email: savedUser.email,
        mobileNo: savedUser.mobileNo
      };

    }
    catch(err) {
      console.log({err});
      throw new BadRequestException('Email already taken');
    }
  }

  async findAll(filter: string):Promise<User[]> {
    if (filter) {
      const value = Object.values(JSON.parse(filter)).toString();
      const key = Object.keys(JSON.parse(filter))[0];

      return await this.userModel
        .find()
        .where(key, new RegExp(value, 'i'))
        .populate('merchant')
        .exec();
    }
    return await this.userModel.find().populate('merchant').exec();
  }

  async findOne(email: string) {
    return await this.userModel.findOne({ email }, 'email type deleted');
  }

  async findOneForLogin(email: string, type: string) {
    return await this.userModel.findOne({ email, deleted: false, type }, 'email password type verified deleted');
  }

  async update(id: string, updateUserDto: UserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true});
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }

  async isVerified(email: string) {
    return await this.userModel.findOne({ email }, 'id verified');
  }

  verifyEmail(id: string) {
    this.userModel.findByIdAndUpdate(id, { verified: true });
  }

}
