import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PaymentDto } from './payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {

  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() paymentDto: PaymentDto) {
    return this.paymentService.create(paymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() paymentDto: PaymentDto) {
    return this.paymentService.update(id, paymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
