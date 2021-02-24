import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from 'src/email/email.module';
import { UserModule } from 'src/user/user.module';
import { VerifyEmailController } from './verify-email.controller';
import { VerifyEmail, VerifyEmailSchema } from './verify-email.schema';
import { VerifyEmailService } from './verify-email.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VerifyEmail.name, schema: VerifyEmailSchema }]),
    UserModule,
    EmailModule,
  ],
  controllers: [VerifyEmailController],
  providers: [VerifyEmailService]
})
export class VerifyEmailModule {}
