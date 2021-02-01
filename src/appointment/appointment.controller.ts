import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AppoitmentService } from './appointment.service';
import { CreateAppoitmentDto } from './dto/create-appoitment.dto';
import { UpdateAppoitmentDto } from './dto/update-appoitment.dto';

@Controller('appoitment')
export class AppoitmentController {
  constructor(private readonly appoitmentService: AppoitmentService) {}

  @Post()
  create(@Body() createAppoitmentDto: CreateAppoitmentDto) {
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
  update(@Param('id') id: string, @Body() updateAppoitmentDto: UpdateAppoitmentDto) {
    return this.appoitmentService.update(+id, updateAppoitmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appoitmentService.remove(+id);
  }
}
