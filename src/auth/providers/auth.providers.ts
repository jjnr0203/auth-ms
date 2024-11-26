import { AuthRepositoryEnum, DatabaseProviderEnum } from "src/shared/enums/repository.enum";
import { DataSource } from "typeorm";
import { InformationUserEntity } from "../entities/information_user.entity";
import { RoleEntity } from "../entities/role.entity";
import { UserEntity } from "../entities/user.entity";

export const authProviders = [
  {
    provide: AuthRepositoryEnum.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [DatabaseProviderEnum.POSTGRES],
  },
  {
    provide: AuthRepositoryEnum.ROLE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RoleEntity),
    inject: [DatabaseProviderEnum.POSTGRES],
  },
  {
    provide: AuthRepositoryEnum.INFORMATION_USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InformationUserEntity),
    inject: [DatabaseProviderEnum.POSTGRES],
  },
];
