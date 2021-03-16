import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

type loginData = {
  readonly username: string;
  readonly password: string;
  readonly type: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const { username, password, type } = req.body as unknown as loginData;
    const user = await this.authService.validateUser(username, password, type);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
