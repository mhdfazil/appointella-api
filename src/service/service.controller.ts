import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ServiceDto } from './service.dto';
import { ServiceService } from './service.service';
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  create(@Body() createServiceDto: ServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: ServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
