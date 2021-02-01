import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserNoSpecModule } from './user--no-spec/user--no-spec.module';
import { UserModule } from './user/user.module';
import { MerchantsModule } from './merchants/merchants.module';
import { MerchantModule } from './merchant/merchant.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [UserNoSpecModule, UserModule, MerchantsModule, MerchantModule, AdminModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
