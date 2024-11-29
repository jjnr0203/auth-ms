import { Injectable } from "@nestjs/common";
import { RolesSeeder } from "./roles.seeder";


@Injectable()
export class DatabaseSeeder{
    constructor(
        private rolesSeeder: RolesSeeder
    ){}

    async run(){
        await this.rolesSeeder.run()
    }

}