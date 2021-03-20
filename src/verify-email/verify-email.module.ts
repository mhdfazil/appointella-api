import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from 'src/email/email.module';
import { VerifyEmailController } from './verify-email.controller';
import { VerifyEmail, VerifyEmailSchema } from './verify-email.schema';
import { VerifyEmailService } from './verify-email.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VerifyEmail.name, schema: VerifyEmailSchema }]),
    EmailModule,
  ],
  controllers: [VerifyEmailController],
  providers: [VerifyEmailService],
  exports: [VerifyEmailService]
})
export class VerifyEmailModule {}
