import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Nullsale {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: true })
  idSystemGc: string;

  @Column({ nullable: true })
  idAzatGc: string;

  @Column({ nullable: true })
  idUserGc: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  userEmail: string;

  @Column({ nullable: true })
  createdAt: string;

  @Column({ nullable: true })
  userPhone: string;

  @Column({ nullable: true })
  orderName: string;

  @Column({ nullable: true })
  payedAt: string;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  dealStatus: string;

  @Column({ nullable: true })
  payFee: string;

  @Column({ nullable: true })
  payedPrice: string;

  @Column({ nullable: true })
  taxes: string;

  @Column({ nullable: true })
  income: string;

  @Column({ nullable: true })
  otherFee: string;

  @Column({ nullable: true })
  profit: string;

  @Column({ nullable: true })
  managerName: string;

  @Column({ nullable: true })
  netProfit: string;

  @Column({ nullable: true })
  payedBy: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  promoCompany: string;

  @Column({ nullable: true })
  promocodeUsed: string;

  @Column({ nullable: true })
  utmMedium: string;

  @Column({ nullable: true })
  utmSource: string;

  @Column({ nullable: true })
  utmContent: string;

  @Column({ nullable: true })
  utmCampaign: string;

  @Column({ nullable: true })
  utmGroup: string;

  @Column({ nullable: true })
  utmTerm: string;

  @Column({ nullable: true })
  orderComments: string;

  @Column({ nullable: true })
  workWithOrder: string;

  @Column({ nullable: true })
  orderTag: string;

  @Column({ nullable: true })
  rejectReason: string;
}
