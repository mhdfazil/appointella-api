import { Controller, Get, Post, Body, Put, Param, Delete, Query, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantDto } from './merchant.dto';
import { MerchantUpdateDto } from './merchant-update.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/config/role';
import { Merchant } from './merchant.schema';
import { Public } from 'src/auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}


  @Public()
  @Post()
  create(@Body() createMerchantDto: MerchantDto) {
    return this.merchantService.create(createMerchantDto);
  }

  @Get()
  findAll(@Query('filter') filter: string) {
    return this.merchantService.findAll(filter);
  }

  @Get('/service')
  findServices(@Query('filter') filter: string) {
    return this.merchantService.findServices(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantService.findOne(id);
  }

  @Roles(Role.Merchant, Role.Admin)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() merchantUpdateDto: MerchantUpdateDto, @UploadedFile() image: Express.Multer.File) {
    return this.merchantService.update(id, merchantUpdateDto, image);
  }

  @Roles(Role.Merchant, Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantService.remove(id);
  }
}
