import { Injectable } from '@nestjs/common';
import { AppointmentDto } from './appointment.dto';

@Injectable()
export class AppoitmentService {
  create(createAppoitmentDto: AppointmentDto) {
    return 'This action adds a new appoitment';
  }

  findAll() {
    return `This action returns all appoitment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appoitment`;
  }

  update(id: number, updateAppoitmentDto: AppointmentDto) {
    return `This action updates a #${id} appoitment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appoitment`;
  }
}
