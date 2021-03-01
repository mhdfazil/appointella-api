import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { Role } from 'src/config/role';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CustomerDto } from './customer.dto';
import { CustomerUpdateDto } from './customer-update.dto';
import { CustomerService } from './customer.service';
import { Customer } from './customer.schema';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles(Role.Customer, Role.Admin)
  @Post()
  create(@Body() createCustomerDto: CustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) : Promise<Customer[]> {
    return this.customerService.findByName(name);
  }

  @Roles(Role.Customer, Role.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() customerUpdateDto: CustomerUpdateDto) {
    return this.customerService.update(id, customerUpdateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
