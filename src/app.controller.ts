import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseSeeder } from './database/seeders/database.seeder';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly databaseSeeder: DatabaseSeeder) {}

  @MessagePattern('rolesSeed')
  seed() {
    // const seed = this.databaseSeeder.run;
    return this.databaseSeeder.run();
  }
}
 