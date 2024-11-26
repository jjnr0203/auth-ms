import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserDto } from '../user/create-user.dto';

export class CreateInformationUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  lastname?: string; 
  
  @IsString()
  @IsOptional()
  phone?: string; 

}
