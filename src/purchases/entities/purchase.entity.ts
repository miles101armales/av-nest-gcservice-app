import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryColumn()
  purchaseId: number;

  @Column()
  user: string;

  @Column()
  email: string;

  @Column()
  product: string;

  @Column()
  createdAt: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column()
  price: string;

  @Column()
  payFee: string;

  @Column()
  payedPrice: string;

  @Column()
  codePayment: string;

  @Column()
  productTitle: string;
}
