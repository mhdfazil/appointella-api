import { Injectable } from '@nestjs/common';
import { CreateAppoitmentDto } from './dto/create-appoitment.dto';
import { UpdateAppoitmentDto } from './dto/update-appoitment.dto';

@Injectable()
export class AppoitmentService {
  create(createAppoitmentDto: CreateAppoitmentDto) {
    return 'This action adds a new appoitment';
  }

  findAll() {
    return `This action returns all appoitment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appoitment`;
  }

  update(id: number, updateAppoitmentDto: UpdateAppoitmentDto) {
    return `This action updates a #${id} appoitment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appoitment`;
  }
}
