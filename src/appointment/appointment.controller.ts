import { Controller, Get, Post, Body, Put, Param, Delete, Query, Request } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/config/role';
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

  @Roles(Role.Customer)
  @Get('me')
  findByCustomerToken(@Request() req) {
    return this.appoitmentService.findByCustomerToken(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appoitmentService.findOne(id);
  }

  @Get('customer/:id')
  findByCustomer(@Param('id') id: string) {
    return this.appoitmentService.findByCustomer(id);
  }

  @Get('merchant/:id')
  findByMerchant(@Param('id') id: string) {
    return this.appoitmentService.findByMerchant(id);
  }

  @Get('customer/:id')
  findByCustomerDate(@Param('id') id: string, @Query('date') date: Date) {
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
