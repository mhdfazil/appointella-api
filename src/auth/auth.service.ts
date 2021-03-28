
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CustomerService } from 'src/customer/customer.service';
import { MerchantService } from 'src/merchant/merchant.service';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private customerService: CustomerService,
    private merchantService: MerchantService,
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

  async login(loggedUser: any) {
    let user;
    const access_token = this.jwtService.sign({ email: loggedUser.email, sub: loggedUser.id, role: loggedUser.role })
    if(loggedUser.role === 'customer') {
      user = await this.customerService.findOne(loggedUser.id)      
    }
    if(loggedUser.role === 'merchant') {
      user = await this.merchantService.findOne(loggedUser.id) 
      user = user._id    
    }
    return {
      access_token,
      user
    }
  }
}
