import { envs } from 'src/config/envs';
import { DatabaseProviderEnum } from 'src/shared/enums/repository.enum';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DatabaseProviderEnum.POSTGRES,
    useFactory: async () => {
      const {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} = envs.DATABASE
      
      const dataSource = new DataSource({ 
        type: 'postgres',
        host: DB_HOST,
        port: DB_PORT,
        password: DB_PASSWORD,
        username: DB_USER,
        database: DB_NAME,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
        // dropSchema:true  
      });

      return dataSource.initialize();
    },
  },
];