import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointment/appointment.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { FeedbackModule } from './feedback/feedback.module';
import { MerchantModule } from './merchant/merchant.module';
import { PaymentModule } from './payment/payment.module';
import { ServiceModule } from './service/service.module';
import { UserModule } from './user/user.module';
import { VerifyEmailModule } from './verify-email/verify-email.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailModule } from './email/email.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import * as mongoose from 'mongoose';
import * as multer from 'multer';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';

mongoose.set('useCreateIndex', true);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({ storage: multer.memoryStorage }),
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: configService.get<string>('GMAIL'),
            pass: configService.get<string>('GOOGLE_PWD'),
          }
        },
        defaults: {
          from:'"Appointella" <appointella@gmail.com>',
        },
        template: {
          dir: 'src/assets/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService],
    }),
    AppointmentModule, 
    ServiceModule, 
    FeedbackModule, 
    PaymentModule, 
    UserModule, 
    MerchantModule, 
    AdminModule, 
    CustomerModule, 
    AuthModule, 
    VerifyEmailModule,
    EmailModule,
    ResetPasswordModule,
    ScheduleModule.forRoot(),
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
