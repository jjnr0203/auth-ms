import { Global, Module } from '@nestjs/common';
import { authProviders } from './providers';
import {
  AuthService,
  InformationUsersService,
  RolesService,
  UsersService,
} from './services';
import {
  AuthController,
  InformationUsersController,
  RolesController,
  UsersController,
} from './controllers';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { DatabaseModule } from 'src/database/database.module';

@Global()
@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret:envs.JWT_SECRET,
      signOptions:{
        expiresIn: '15m'
      }
    })
  ],
  controllers: [
    AuthController,
    InformationUsersController,
    RolesController,
    UsersController,
    AuthController,
  ],
  providers: [
    ...authProviders,
    InformationUsersService,
    RolesService,
    UsersService,
    AuthService,
  ],
  exports:[
    UsersService,
    RolesService
  ]
})
export class AuthModule {}
