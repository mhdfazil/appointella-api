import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { VerifyEmailService } from './verify-email.service';

@Controller('verify-email')
export class VerifyEmailController {
  constructor(private readonly verifyEmailService: VerifyEmailService) {}

  @Public()
  @Get(':email/:code')
  verify(@Param('email') email: string, @Param('code') code: string) {
    return this.verifyEmailService.verify(email, code);
  }

  @Public()
  @Get('send')
  send() {
    return this.verifyEmailService.send();
  }

}
