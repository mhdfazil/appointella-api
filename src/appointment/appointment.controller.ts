import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AppointmentDto } from './appointment.dto';
import { AppoitmentService } from './appointment.service';

@Controller('appoitment')
export class AppoitmentController {
  constructor(private readonly appoitmentService: AppoitmentService) {}

  @Post()
  create(@Body() createAppoitmentDto: AppointmentDto) {
    return this.appoitmentService.create(createAppoitmentDto);
  }

  @Get()
  findAll() {
    return this.appoitmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appoitmentService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAppoitmentDto: AppointmentDto) {
    return this.appoitmentService.update(+id, updateAppoitmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appoitmentService.remove(+id);
  }
}
