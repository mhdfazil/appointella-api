import { Injectable } from '@nestjs/common';
import { MerchantDto } from './merchant.dto';

@Injectable()
export class MerchantService {
  create(createMerchantDto: MerchantDto) {
    return 'This action adds a new merchant';
  }

  findAll() {
    return `This action returns all merchant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} merchant`;
  }

  update(id: number, updateMerchantDto: MerchantDto) {
    return `This action updates a #${id} merchant`;
  }

  remove(id: number) {
    return `This action removes a #${id} merchant`;
  }
}
