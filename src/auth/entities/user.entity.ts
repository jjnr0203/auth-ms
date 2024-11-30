import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { InformationUserEntity } from './information_user.entity';
import * as bcrypt from 'bcrypt'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    select: false,
    name: 'created_at',
    type: 'timestamp',
    comment: 'Fecha de creación',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @DeleteDateColumn({
    select: false,
    name: 'deleted_at',
    type: 'timestamp',
    comment: 'Registro de borrado',
  })
  deletedAt: Date;

  @UpdateDateColumn({
    select: false,
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    name: 'email',
    type: 'varchar',
    unique:true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: true,
  })
  password?: string;

  @ManyToMany(() => RoleEntity, {cascade:true})
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: RoleEntity[];
 
  @OneToOne( () => InformationUserEntity, (informationUser) => informationUser.id, {cascade:true})
  @JoinColumn({ name: 'information_user_id' })
  informationUser: InformationUserEntity;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(){
    if(this.password){
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
}

