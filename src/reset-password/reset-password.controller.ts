import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { ResetPasswordDto } from './reset-password.dto';
import { ResetPasswordService } from './reset-password.service';

@Public()
@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post()
  create(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.resetPasswordService.create(resetPasswordDto);
  }
  
  @Post('reset')
  @Render('reset-pwd-result')
  resetPwd(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.resetPasswordService.resetPassword(resetPasswordDto);
  }

  @Get(':token')
  @Render('reset-pwd-form')
  sendResetForm(@Param('token') token: string) {
    return this.resetPasswordService.sendResetForm(token);
  }

}
