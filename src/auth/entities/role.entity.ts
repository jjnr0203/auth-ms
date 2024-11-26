import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('roles', { schema: 'auth' })
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    select:false,
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    select:false,
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  } )
  updatedAt: Date;

  @DeleteDateColumn({
    select:false,
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  /** Columns **/
  @Column({
    name: 'code',
    type: 'integer',
    unique: true,
    comment: 'Codigo del rol',
  })
  code: number;

  @Column({
    name: 'name',
    type: 'varchar',
    unique: true,
    comment: 'Nombre del rol',
  })
  name: string;
  
}
