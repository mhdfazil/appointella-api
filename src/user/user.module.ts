import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from 'src/admin/admin.module';
import { CustomerModule } from 'src/customer/customer.module';
import { MerchantModule } from 'src/merchant/merchant.module';
import { VerifyEmailModule } from 'src/verify-email/verify-email.module';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CustomerModule,
    VerifyEmailModule,
    MerchantModule,
    AdminModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
