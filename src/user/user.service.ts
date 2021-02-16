import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
import { saltOrRounds } from 'src/auth/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    user.password = hash;

    const newuser = new this.userModel(user);
    return await newuser.save();
  }

  async findAll():Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username: string) {
    return await this.userModel.findOne({ username: username }, 'username type deleted');
  }

  async findOneForLogin(username: string) {
    return await this.userModel.findOne({ username: username, deleted: false }, 'username password type deleted');
  }

  async update(id: string, updateUserDto: UserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true});
  }

  remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }

}
