import { Injectable } from "@nestjs/common";
import { RolesService } from "src/auth/services";
import { seedData } from "./data";


@Injectable()
export class DatabaseSeeder{
    constructor(
       private readonly rolesService:RolesService
    ){}

    async run(){
        const roles = await this.rolesService.insertMany(seedData.roles)
        return roles
    }

}