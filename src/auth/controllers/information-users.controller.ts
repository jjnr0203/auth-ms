import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateInformationUserDto, UpdateInformationUserDto } from '../dto';
import { InformationUsersService } from '../services/information-users.service';

@Controller('information-users')
export class InformationUsersController {
  constructor(
    private readonly informationUsersService: InformationUsersService,
  ) {}

  @Post()
  async create(@Body() payload: CreateInformationUserDto) {
    const informationUser = await this.informationUsersService.create(payload);
    return informationUser;
  }

  @Get()
  async findAll() {
    const informationUsers = await this.informationUsersService.findAll();
    return informationUsers;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const informationUser = await this.informationUsersService.findOne(id);
    return informationUser;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateInformationUserDto,
  ) {
    const informationUser = await this.informationUsersService.update(
      id,
      payload,
    );
    return informationUser;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const informationUser = await this.informationUsersService.delete(id);
    return informationUser;
  }
}
