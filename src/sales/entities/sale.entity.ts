import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Sale {
  @PrimaryColumn()
  idSystemGc: number;

  @Column()
  idAzatGc: number;

  @Column()
  idUserGc: number;

  @Column()
  userName: string;

  @Column()
  userEmail: string;

  @Column()
  createdAt: string;

  @Column()
  userPhone: string;

  @Column()
  orderName: string;

  @Column()
  payedAt: string;

  @Column()
  price: number;

  @Column()
  dealStatus: string;

  @Column()
  payFee: number;

  @Column()
  payedPrice: number;

  @Column()
  taxes: number;

  @Column()
  income: number;

  @Column()
  otherFee: number;

  @Column()
  profit: number;

  @Column()
  managerName: string;

  @Column()
  netProfit: number;

  @Column()
  payedBy: string;

  @Column()
  city: string;

  @Column()
  promoCompany: string;

  @Column()
  promocodeUsed: string;

  @Column()
  utmMedium: string;

  @Column()
  utmSource: string;

  @Column()
  utmContent: string;

  @Column()
  utmCampaign: string;

  @Column()
  utmGroup: string;

  @Column()
  utmTerm: string;

  @Column()
  orderComments: string;

  @Column()
  workWithOrder: string;

  @Column()
  orderTag: string;

  @Column()
  rejectReason: string;
}
