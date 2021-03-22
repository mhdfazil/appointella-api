import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Role } from 'src/config/role';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AdminDto } from './admin.dto';
import { AdminUpdateDto } from './admin-update.dto';
import { Admin } from './admin.schema';
import { AdminService } from './admin.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('admin')
@Roles(Role.Admin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: AdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll(@Query('filter') filter: string) {
    return this.adminService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() adminUpdateDto: AdminUpdateDto, @UploadedFile() image: Express.Multer.File) {
    return this.adminService.update(id, adminUpdateDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
