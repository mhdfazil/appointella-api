import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

type loginData = {
  readonly email: string;
  readonly password: string;
  readonly type: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const { email, password, type } = req.body as unknown as loginData;
    const user = await this.authService.validateUser(email, password, type);
    if (!user) {
      throw new UnauthorizedException();
    }
    if(!user.verified) {
      throw new BadRequestException('Please confirm your email. Check your email for confirmation.');
    }
    return user;
  }
}
