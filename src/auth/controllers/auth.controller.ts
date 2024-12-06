import { Controller } from '@nestjs/common';
import { AuthService } from '../services';
import { CreateUserDto } from '../dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from '../dto/user/login.dto';
import { CreateUserFromGoogleDto } from '../dto/user/create-google-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  async login(@Payload() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    const token = await this.authService.generateJwt(user.id);
    return { user, token };
  }

  @MessagePattern('register')
  async register(@Payload() createUserDto: CreateUserDto) {
    const user = await this.authService.registerLocalUser(createUserDto);
    const token = await this.authService.generateJwt(user.id);

    return { token, user };
  }

  @MessagePattern('validateToken')
  async validateToken(@Payload() receivedToken: string) {
    const user = await this.authService.validateToken(receivedToken);
    const token = await this.authService.generateJwt(user.id);
    return {user,token};
  }

  @MessagePattern('validateGoogleUser')
  async validateGoogleUser(@Payload() createGoogleUserDto: CreateUserFromGoogleDto) {
    const user = await this.authService.validateOAuthUser(createGoogleUserDto)
    const token = await this.authService.generateJwt(user.id);
    return {user,token};
  }

}
