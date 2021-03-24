import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/config/role';
import { CustomerUpdateDto } from './customer-update.dto';
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
  findAll(@Query('filter') filter:string) {
    return this.customerService.findAll(filter);
  }

  @Roles(Role.Customer)
  @Get('me')
  getProfile(@Request() req) {
    return this.customerService.findMe(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Roles(Role.Customer, Role.Admin)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() customerUpdateDto: CustomerUpdateDto, @UploadedFile() image: Express.Multer.File) {
    return this.customerService.update(id, customerUpdateDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
