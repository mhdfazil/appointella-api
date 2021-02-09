import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDto } from './admin.dto';
import { Admin, AdminDocument } from './admin.schema';

@Injectable()
export class AdminService {

  constructor( @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>) {}

  async create(createAdminDto: AdminDto): Promise<Admin> {
    const newAdmin = new this.adminModel(createAdminDto);
    return await newAdmin.save();
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminModel.find().exec();
  }

  async findOne(id: string): Promise<Admin> {
    return await this.adminModel.findById(id);
  }

  async update(id: string, updateAdminDto: AdminDto): Promise<Admin> {
    const updateAdmin = new this.adminModel(updateAdminDto);
    return await this.adminModel.findByIdAndUpdate(id, updateAdmin, {new: true}) ;
  }

  async remove(id: string): Promise<Admin> {
    return await this.adminModel.findByIdAndRemove(id);
  }
}
