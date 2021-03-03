import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AppointmentDto } from './appointment.dto';
import { AppoitmentService } from './appointment.service';

@Controller('appointment')
export class AppoitmentController {
  constructor(private readonly appoitmentService: AppoitmentService) {}

  @Post()
  create(@Body() appoitmentDto: AppointmentDto) {
    return this.appoitmentService.create(appoitmentDto);
  }

  @Get()
  findAll() {
    return this.appoitmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appoitmentService.findOne(id);
  }

  @Get('customer/:id')
  findByCustomer(@Param('id') id: string) {
    return this.appoitmentService.findByCustomer(id);
  }

  @Get('customer/:id/:date')
  findByCustomerDate(@Param('id') id: string, @Param('date') date: string) {
    return this.appoitmentService.findByCustomerDate(id, date);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() appoitmentDto: AppointmentDto) {
    return this.appoitmentService.update(id, appoitmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appoitmentService.remove(id);
  }
}
