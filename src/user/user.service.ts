import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AdminService } from 'src/admin/admin.service';
import imageUpload from 'src/config/imageUpload';
import { CustomerService } from 'src/customer/customer.service';
import { MerchantService } from 'src/merchant/merchant.service';
import { VerifyEmailService } from 'src/verify-email/verify-email.service';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements OnModuleInit {

  private adminService: AdminService

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private moduleRef: ModuleRef,
    private customerService: CustomerService,
    private merchantService: MerchantService,
    private configService: ConfigService,
    private verifyEmailService: VerifyEmailService,
  ) {}

  onModuleInit() {
    this.adminService = this.moduleRef.get(AdminService, { strict: false });
  }

  async create(user: User): Promise<any> {
    const hash = await bcrypt.hash(user.password, parseInt(this.configService.get<string>('SALT_ROUND')));
    user.password = hash;

    const newuser = new this.userModel(user);

    try {
      const savedUser = await newuser.save();

      // save customer
      if(user.type === 'customer') {
        this.customerService.create({ user: savedUser._id })
      }
      // save merchant
      if(user.type === 'merchant') {
        this.merchantService.create({ user: savedUser._id })
      }
      // save merchant
      if(user.type === 'admin') {
        this.adminService.create({ user: savedUser._id })
      }

      // send email verification
      this.verifyEmailService.create({ email: savedUser.email });
      
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
    const user = await this.userModel.findOne({ email, deleted: false, type }, 'email password type verified deleted');
    if(user && type === 'customer') {
      const { id } = await this.customerService.findBy({ user: Types.ObjectId(user.id) })
      return {
        email: user.email,
        password: user.password,
        verified: user.verified,
        type: user.type,
        id
      }
    }
    else if(user && type === 'merchant') {
      const { id } = await this.merchantService.findBy({ user: Types.ObjectId(user.id) })
      return {
        email: user.email,
        password: user.password,
        verified: user.verified,
        type: user.type,
        id
      }
    }
    
    return user
  }

  async update(id: string, updateUserDto: UserDto, image: Express.Multer.File) {
    if(image) {
      const result = await imageUpload(image.buffer);
      updateUserDto.image = result.url;
    }

    // update password
    if(updateUserDto.password && updateUserDto.currentPassword) {

      if(updateUserDto.password.length < 6)
        throw new BadRequestException('Password must be more than 5 characters.')
      
      const user = await this.userModel.findById(id).select('password').exec();
      
      if(await bcrypt.compare(updateUserDto.currentPassword, user.password)) {
        const password = await bcrypt.hash(updateUserDto.password, parseInt(this.configService.get<string>('SALT_ROUND')));        
        return await this.userModel.findByIdAndUpdate(id, { password }, {new:true});
      }
      else {
        throw new BadRequestException('Invalid current password.')
      }
    }

    if(updateUserDto.password) 
      delete updateUserDto.password

    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true});
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }

  async isVerified(email: string) {
    const user = await this.userModel.findOne({ email }, 'id verified');
    console.log({user});
    
    return user;
  }

  async verifyEmail(id: string) {
    return await this.userModel.findByIdAndUpdate(id, { verified: true }, {new:true});
  }

}
