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

  findAll() {
    return `This action returns all user`;
  }

  async findOne(username: string) {
    return await this.userModel.findOne({ username: username }, 'user_name type deleted');
  }

  async findOneForLogin(username: string) {
    return await this.userModel.findOne({ username: username, deleted: false }, 'user_name password type deleted');
  }

  update(id: number, updateUserDto: UserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
