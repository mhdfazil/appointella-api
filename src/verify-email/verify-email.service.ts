import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import { VerifyEmailDto } from './verify-email.dto';
import { VerifyEmail, VerifyEmailDocument } from './verify-email.schema';

@Injectable()
export class VerifyEmailService {

  constructor(
    @InjectModel(VerifyEmail.name) private readonly verifyEmailModel: Model<VerifyEmailDocument>,
    private userService: UserService,
    private emailService: EmailService
  ) {}

  async create(verifyEmailDto: VerifyEmailDto) {
    verifyEmailDto.code = this.generateCode();
    const newVerify = new this.verifyEmailModel(verifyEmailDto);
    return await newVerify.save();
  }

  async verify(email: string, code: string) {
    try {
      const { id, verified } = await this.userService.isVerified(email);
      if(verified) {
        // already verified
        return 'Email already verified';
      }
      else if(await this.verifyEmailModel.exists({ email, code })) {
        this.userService.verifyEmail(id);
        return 'Email successfully verified';
      }
      else {
        // code expired
        return 'Your verification is expired. Try again.';
      }
    }
    catch {
      //not registerd yet
      return 'You are not registered yet. Please register with our platform';
    }
  }

  send() {
    this.emailService.verify('#', 'mhdfazil79@gmail.com');
  }

  generateCode() { 
    // Declare a digits variable  
    // which stores all digits 
    const digits = '0123456789'; 
    let code = ''; 
    for (let i = 0; i < 8; i++ ) { 
      code += digits[Math.floor(Math.random() * 10)]; 
    } 
    return code; 
  } 

}
