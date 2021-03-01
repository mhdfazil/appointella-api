import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantDto } from './merchant.dto';
import { MerchantUpdateDto } from './merchant-update.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/config/role';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Roles(Role.Merchant, Role.Admin)
  @Post()
  create(@Body() createMerchantDto: MerchantDto) {
    return this.merchantService.create(createMerchantDto);
  }

  @Get()
  findAll() {
    return this.merchantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantService.findOne(id);
  }

  @Roles(Role.Merchant, Role.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() merchantUpdateDto: MerchantUpdateDto) {
    return this.merchantService.update(id, merchantUpdateDto);
  }

  @Roles(Role.Merchant, Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantService.remove(id);
  }
}
