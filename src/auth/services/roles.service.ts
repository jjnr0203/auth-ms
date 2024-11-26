import {  Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthRepositoryEnum} from 'src/shared/enums/repository.enum';
import { Repository } from 'typeorm';
import {  UpdateInformationUserDto } from '../dto';
import { RoleEntity } from '../entities/role.entity';
import { CreateRoleDto } from '../dto/role/create-role.dto';

@Injectable()
export class RolesService {
    
  constructor(
    @Inject(AuthRepositoryEnum.ROLE_REPOSITORY)
    private repository: Repository<RoleEntity>,
  ) {}

  async create(payload: CreateRoleDto) {
    const informationUser = await this.repository.create(payload);
    await this.repository.save(informationUser);
    return informationUser;
  }

  async findAll() {
    const informationUsers = await this.repository.find();
    return informationUsers;
  }

  async findOne(id: string) {
    const informationUser = await this.repository.findOne({
      where: { id: id },
    });
    return informationUser;
  }

  async findByCode(id: number) {
    const informationUser = await this.repository.findOne({
      where: { code: id },
    });
    return informationUser;
  }
  async update(id: string, payload: UpdateInformationUserDto) {
    const informationUser = await this.repository.preload({
      id: id,
      ...payload,
    });
    if (!informationUser)
      throw new NotFoundException('Information user not found');
    try {
      await this.repository.save(informationUser);
      return informationUser;
    } catch (error) {
      console.log(error);

      return 'Error updating the user';
    }
  }
  async delete(id: string) {
    const informationUser = await this.repository.softDelete(id);
    return informationUser;
  }

}
