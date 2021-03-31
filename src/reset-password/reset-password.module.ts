import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResetPassword, ResetPasswordSchema } from './reset-password.schema';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ResetPassword.name, schema: ResetPasswordSchema }]),
    UserModule,
    EmailModule,
  ],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService]
})
export class ResetPasswordModule {}
