import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from './merchant.schema'
import { MerchantService } from './merchant.service';
import { ServiceModule } from '../service/service.module';
import { MerchantController } from './merchant.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Merchant.name, schema: MerchantSchema }]),
    ServiceModule
  ],
  exports:[MerchantService],
  controllers: [MerchantController],
  providers: [MerchantService]
})
export class MerchantModule {}
