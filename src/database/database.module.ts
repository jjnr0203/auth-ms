import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from './seeders/database.seeder';
import { RolesSeeder } from './seeders/roles.seeder';

@Global()
@Module({
    providers:[...databaseProviders, RolesSeeder, DatabaseSeeder],
    exports:[...databaseProviders, DatabaseSeeder]
})
export class DatabaseModule {}
