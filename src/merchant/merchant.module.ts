import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceModule } from '../service/service.module';
import { MerchantController } from './merchant.controller';
import { Merchant, MerchantSchema } from './merchant.schema';
import { MerchantService } from './merchant.service';

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
