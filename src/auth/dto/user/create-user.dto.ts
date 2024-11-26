import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RoleEntity } from "../../entities/role.entity";
import { CreateInformationUserDto } from "../information-user/create-information-user.dto";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    informationUser: CreateInformationUserDto;
}
