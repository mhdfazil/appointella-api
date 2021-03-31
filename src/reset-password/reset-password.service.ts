import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import { ResetPasswordDto } from './reset-password.dto';
import { ResetPassword, ResetPasswordDocument } from './reset-password.schema';

@Injectable()
export class ResetPasswordService {

  constructor(
    @InjectModel(ResetPassword.name) private readonly resetPasswordModel: Model<ResetPasswordDocument>,
    private userService: UserService,
    private emailService: EmailService,
    private configService: ConfigService
  ) {}

  async create(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userService.findOne(resetPasswordDto.email)
    if(!user)
      throw new BadRequestException('User doesn\'t exist.')

    const resetPassword = await this.resetPasswordModel.findOne({ user: user.id })
    if(resetPassword && resetPassword.reset === 'done') 
      throw new BadRequestException('You already reseted your password today. If you insist on resetting your password, please try again in 24hours.')

    let token
    if(resetPassword) {
      token = resetPassword.token
    }
    else {
      token = this.generateCode()
      const resetPassword = new this.resetPasswordModel({ token, user: user.id })
      await this.resetPasswordModel.create(resetPassword)
    }

    const path = this.configService.get<string>('BASE_PATH') + `reset-password/${token}`
    return await this.emailService.resetPassword(path, resetPasswordDto.email);
  }

  async sendResetForm(token: string) {
    const resetPassword = await this.resetPasswordModel.findOne({ token })
    if(!resetPassword)
      throw new BadRequestException('Your reset password link expired or you didn\'t request for reset your password')
    if(resetPassword.reset === 'done')
      throw new BadRequestException('You already reset your password.')
    if(resetPassword.reset === 'created')
      await this.resetPasswordModel.findByIdAndUpdate(resetPassword.id, { reset: 'form-sent' })

    const link = this.configService.get<string>('BASE_PATH') + `reset-password/reset`
    const script = '/assets/views/reset-pwd-form.js'
    return await { token, link, script };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const resetPassword = await this.resetPasswordModel.findOne({ token: resetPasswordDto.token })
    if(!resetPassword)
      throw new BadRequestException('Your reset password link expired or you didn\'t request for reset your password')
    if(resetPassword.reset === 'done')
      throw new BadRequestException('You already reset your password.')
    if(resetPassword.reset === 'created')
      throw new BadRequestException('Please reset your password via the email we sent to you.')

    const hash = await bcrypt.hash(resetPasswordDto.password, parseInt(this.configService.get<string>('SALT_ROUND')));
    const user = await this.userService.updatePassword(resetPassword.user.toString(), hash)

    if(!user)
      throw new BadRequestException('Oops! Something went wrong. Please try again in a moment.')

    await this.resetPasswordModel.findByIdAndUpdate(resetPassword.id, { reset: 'done' })

    return true
  }

  generateCode() { 
    const digits = '0123456789'; 
    let code = new Date().getTime().toString(); 
    for (let i = 0; i < 5; i++ ) { 
      code += digits[Math.floor(Math.random() * 10)]; 
    } 
    return code; 
  } 

}
