import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Role } from 'src/config/role';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CustomerDto } from './customer.dto';
import { CustomerService } from './customer.service';

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

  @Roles(Role.Customer, Role.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: CustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
