import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './admin.schema';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  UserModule
],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
