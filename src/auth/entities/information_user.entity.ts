import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('information_users', { schema: 'auth' })
export class InformationUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    select:false,
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del archivo',
  })
  createdAt: Date;

  @DeleteDateColumn({
    select:false,
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de eliminacion del archivo',
  })
  deletedAt: Date;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'lastname',
    type: 'varchar',
    nullable: true,
  })
  lastname: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    nullable: true,
  })
  phone: string;


  @OneToOne(() => UserEntity, (users) => users.id, {cascade:true})
  user: UserEntity;

}
