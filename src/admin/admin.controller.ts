import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { Role } from 'src/auth/constants';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AdminDto } from './admin.dto';
import { Admin } from './admin.schema';
import { AdminService } from './admin.service';


@Controller('admin')
@Roles(Role.Admin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: AdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: AdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
