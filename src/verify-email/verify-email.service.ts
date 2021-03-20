import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import { VerifyEmailDto } from './verify-email.dto';
import { VerifyEmail, VerifyEmailDocument } from './verify-email.schema';

@Injectable()
export class VerifyEmailService implements OnModuleInit {

  private userService: UserService

  constructor(
    @InjectModel(VerifyEmail.name) private readonly verifyEmailModel: Model<VerifyEmailDocument>,
    private emailService: EmailService,
    private moduleRef: ModuleRef,
    private configService: ConfigService
  ) {}

  onModuleInit() {
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

  async create(verifyEmailDto: VerifyEmailDto) {
    verifyEmailDto.code = this.generateCode();
    const newVerify = new this.verifyEmailModel(verifyEmailDto);
    await newVerify.save();

    const path = this.configService.get<string>('BASE_PATH') + `verify-email/${verifyEmailDto.email}/${verifyEmailDto.code}`
    return await this.emailService.verify(path, verifyEmailDto.email);
  }

  async verify(email: string, code: string) {
    try {
      const { id, verified } = await this.userService.isVerified(email);
      
      if(verified) {
        // already verified
        return 'Email already verified';
      }
      else if(await this.verifyEmailModel.exists({ email, code })) {
        await this.userService.verifyEmail(id);
        return 'Email successfully verified';
      }
      else {
        // code expired
        return 'Your verification is expired. Try resend verification code.';
      }
    }
    catch(err) {
      return 'You are not registered yet. Please register with our platform';
    }
  }
  
  async resend(email: string) {
    try {
      const { verified } = await this.userService.isVerified(email);
      if(verified) {
        throw new BadRequestException('Email already verified.');
      }
      else  {
        const verifyData = await this.verifyEmailModel.findOne({ email }).exec();
        let code
        if(verifyData) {
          code = verifyData.code
        }
        else {
          code = this.generateCode();
          const newVerify = new this.verifyEmailModel({ email, code });
          await newVerify.save();
        }
  
        const path = this.configService.get<string>('BASE_PATH') + `verify-email/${email}/${code}`
        return await this.emailService.verify(path, email);
      }
    }
    catch {
      throw new BadRequestException('You are not registered yet. Please register with our platform.');
    }
  }

  send() {
    this.emailService.verify('#', 'mhdfazil79@gmail.com');
  }

  generateCode() { 
    const digits = '0123456789'; 
    let code = ''; 
    for (let i = 0; i < 8; i++ ) { 
      code += digits[Math.floor(Math.random() * 10)]; 
    } 
    return code; 
  } 

}
