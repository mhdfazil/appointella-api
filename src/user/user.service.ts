import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import imageUpload from 'src/config/imageUpload';
import { CustomerService } from 'src/customer/customer.service';
import { MerchantService } from 'src/merchant/merchant.service';
import { VerifyEmailService } from 'src/verify-email/verify-email.service';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private customerService: CustomerService,
    private merchantService: MerchantService,
    private configService: ConfigService,
    private verifyEmailService: VerifyEmailService
  ) {}

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
      user.id = id
    }
    
    return user
  }

  async update(id: string, updateUserDto: UserDto, image: Express.Multer.File) {
    if(image) {
      const result = await imageUpload(image.buffer);
      updateUserDto.image = result.url;
    }
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
