import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDto } from './admin.dto';
import { AdminUpdateDto } from './admin-update.dto';
import { UserService } from '../user/user.service'
import { Admin, AdminDocument } from './admin.schema';

@Injectable()
export class AdminService {

  constructor( @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
  private userService: UserService
  ) {}

  async create(createAdminDto: AdminDto): Promise<Admin> {
    const newAdmin = new this.adminModel(createAdminDto);
    return await newAdmin.save();
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminModel.find().exec();
  }

  async findOne(id: string): Promise<Admin> {
    return await this.adminModel.findById(id).populate('user');
  }

  async update(id: string, adminUpdateDto: AdminUpdateDto) {
    const updateAdmin = new this.adminModel(adminUpdateDto);
    this.adminModel.findByIdAndUpdate(id, updateAdmin, {new: true});
    return await this.userService.update(adminUpdateDto.user, adminUpdateDto);
  }

  async remove(id: string): Promise<Admin> {
    return await this.adminModel.findByIdAndRemove(id);
  }
}
