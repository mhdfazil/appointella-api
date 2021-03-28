import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDto } from './admin.dto';
import { AdminUpdateDto } from './admin-update.dto';
import { UserService } from '../user/user.service'
import { Admin, AdminDocument } from './admin.schema';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AdminService implements OnModuleInit {
  
  private userService: UserService

  constructor( 
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    private moduleRef: ModuleRef
  ) {}
  
  onModuleInit() {
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

  async create(createAdminDto: AdminDto): Promise<Admin> {
    const newAdmin = new this.adminModel(createAdminDto);
    return await newAdmin.save();
  }

  async findAll(filter: string): Promise<Admin[]> {
    if (filter) {
      const value = Object.values(JSON.parse(filter)).toString();
      const key = Object.keys(JSON.parse(filter))[0];

      return await this.adminModel
        .find()
        .where(key, new RegExp(value, 'i'))
        .populate('user')
        .exec();
    }
    return await this.adminModel.find().populate('user').exec();
  }

  async findOne(id: string): Promise<Admin> {
    return await this.adminModel.findById(id).populate('user');
  }

  async update(id: string, adminUpdateDto: AdminUpdateDto, image: Express.Multer.File) {
    const admin = await this.adminModel.findByIdAndUpdate(id, adminUpdateDto, {new: true});
    const user = await this.userService.update(admin.user.toString(), adminUpdateDto, image);
    return {admin, user}
  }

  async remove(id: string): Promise<Admin> {
    return await this.adminModel.findByIdAndRemove(id);
  }
}
