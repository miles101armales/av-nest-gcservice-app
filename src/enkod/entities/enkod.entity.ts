import { Column, PrimaryColumn } from 'typeorm';

export class Enkod {
  @PrimaryColumn()
  gcUserId: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gcOrderId: number;

  @Column()
  positionsInOrder: string;

  @Column()
  createdAtOrder: string;

  @Column()
  statusOrder: string;
}
