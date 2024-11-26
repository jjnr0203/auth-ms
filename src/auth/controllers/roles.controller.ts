import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/role/create-role.dto';
import { UpdateRoleDto } from '../dto/role/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() payload: CreateRoleDto) {
    const role = await this.rolesService.create(payload);
    return role;
  }

  @Get()
  async findAll() {
    const roles = await this.rolesService.findAll();
    return roles;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role = await this.rolesService.findOne(id);
    return role;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateRoleDto,
  ) {
    const role = await this.rolesService.update(id, payload);
    return role;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const role = await this.rolesService.delete(id);
    return role;
  }
}
