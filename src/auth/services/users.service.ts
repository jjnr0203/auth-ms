import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthRepositoryEnum } from 'src/shared/enums/repository.enum';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UserEntity } from '../entities/user.entity';
import { CreateUserFromGoogleDto } from '../dto/user/create-google-user.dto';
import { RolesService } from './roles.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(AuthRepositoryEnum.USER_REPOSITORY)
    private readonly repository: Repository<UserEntity>,
    private readonly rolesService: RolesService,
  ) {}

  async create(payload: CreateUserDto|CreateUserFromGoogleDto) {
    const role = await this.rolesService.findByCode(1);
    const user = this.repository.create({
      ...payload,
      roles: [role],
    });
    await this.repository.save(user);
    const { password, ...result } = user;
    return result;
  }
  
  async findAll() {
    const users = await this.repository.find({
      select: ['id', 'email'],
      relations: {
        roles: true,
        informationUser: true
      }
    });
    return users;
  }

  async findOne(id: string) {
    if (!id) throw new NotFoundException('User not found');
    const user = await this.repository.findOne({
      where: {id:id},
      select:['id','email'],
      relations:{roles:true, informationUser:true }
    });
    return user;
  }
  
  async findOneByEmail(email: string) {
    const user = await this.repository.findOne({
      where: { email: email },
      relations: {
        roles: true,
        informationUser: true
      },
    });
    return user;
  }

  async update(id: string, payload: UpdateUserDto) {
    const user = await this.repository.preload({
      id: id,
      ...payload,
    });
    if (!user) throw new NotFoundException('user not found');
    try {
      await this.repository.save(user);
      return user;
    } catch (error) {
      console.log(error);

      return 'Error updating the user';
    }
  }
  async delete(id: string) {
    const user = await this.repository.softDelete(id);
    return user;
  }
}
