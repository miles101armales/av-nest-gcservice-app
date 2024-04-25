import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryColumn()
  gcPurchaseId: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  gcUserId: number;

  @Column()
  productTitle: string;

  @Column()
  startAt: string;

  @Column()
  finishAt: string;

  @Column()
  period: string;

  @Column()
  state: string;

  @Column()
  purchase_ink: string;
}
