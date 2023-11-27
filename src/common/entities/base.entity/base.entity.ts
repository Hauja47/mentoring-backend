import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
