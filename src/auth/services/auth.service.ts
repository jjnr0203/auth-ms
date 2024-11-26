import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepositoryEnum } from 'src/shared/enums/repository.enum';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserFromGoogleDto } from '../dto/user/create-google-user.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepositoryEnum.USER_REPOSITORY)
    private readonly repository: Repository<UserEntity>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(id: string) {
    const payload:JwtPayload = { id };
    return this.jwtService.sign(payload);
  }

  async validateLocalUser(email: string, receivedPassword: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordMatch = await compare(receivedPassword, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');
    const {password, ...rest} = user
    return rest;
  }

  async validateOAuthUser(googleUser: CreateUserFromGoogleDto) {
    const user = await this.repository.findOneBy({ email: googleUser.email });

    if (user) {
      return user;
    }
    return await this.registerFromGoogle(googleUser);
  }

  async registerFromGoogle(googleUser: CreateUserFromGoogleDto) {
    return await this.usersService.create(googleUser);
  }
  async registerLocalUser(localUser: CreateUserDto) {
    return await this.usersService.create(localUser);
  }

}
