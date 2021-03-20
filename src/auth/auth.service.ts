
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {}

  async validateUser(email: string, pass: string, type: string): Promise<any> {
    const user = await this.userService.findOneForLogin(email, type);
    if (user && await bcrypt.compare(pass, user.password)) {
      return {
        id: user.id,
        email: user.email,
        role: user.type,
        verified: user.verified
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
