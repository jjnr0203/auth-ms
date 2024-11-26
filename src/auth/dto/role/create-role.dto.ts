import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoleDto{
    @IsInt()
    @IsNotEmpty()
    code:number;
    
    @IsString()
    @IsNotEmpty()
    name:string;

}