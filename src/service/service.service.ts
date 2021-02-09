import { Injectable } from '@nestjs/common';
import { ServiceDto } from './service.dto';

@Injectable()
export class ServiceService {
  create(createServiceDto: ServiceDto) {
    return 'This action adds a new service';
  }

  findAll() {
    return `This action returns all service`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: ServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
