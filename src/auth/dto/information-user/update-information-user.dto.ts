import { PartialType } from "@nestjs/mapped-types";
import { CreateInformationUserDto } from "./create-information-user.dto";

export class UpdateInformationUserDto extends PartialType(CreateInformationUserDto){}