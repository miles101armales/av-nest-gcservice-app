import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Export {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  export_id: number;

  @Column()
  status: 'creating' | 'exported' | 'bad_export_id' | 'ready';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
