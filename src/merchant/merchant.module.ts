import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from './merchant.schema'
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Merchant.name, schema: MerchantSchema }])],
  controllers: [MerchantController],
  providers: [MerchantService]
})
export class MerchantModule {}
