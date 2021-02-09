import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './admin.schema';
import { AdminController } from './admin.controller';

@Module({
  imports:[MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
