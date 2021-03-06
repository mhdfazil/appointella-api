import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';;
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private configService: ConfigService
  ) {}

  async create(user: User): Promise<User> {
    const hash = await bcrypt.hash(user.password, parseInt(this.configService.get<string>('SALT_ROUND')));
    user.password = hash;

    const newuser = new this.userModel(user);

    try {
      return await newuser.save();
    }
    catch(err) {
      throw new BadRequestException('Email already exist');
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
    return await this.userModel.findOne({ email, deleted: false, type }, 'email password type deleted');
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
