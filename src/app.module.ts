import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointment/appointment.module';
import { ServiceModule } from './service/service.module';
import { FeedbackModule } from './feedback/feedback.module';
import { PaymentModule } from './payment/payment.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';
import { MerchantModule } from './merchant/merchant.module';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/key';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI, {useNewUrlParser: true}),
    MulterModule.register({ dest: './uploads' }),
    AppointmentModule, 
    ServiceModule, 
    FeedbackModule, 
    PaymentModule, 
    UserModule, 
    MerchantModule, 
    AdminModule, 
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
