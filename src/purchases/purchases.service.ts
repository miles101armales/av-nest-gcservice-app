import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Repository } from 'typeorm';
import axios, { AxiosResponse } from 'axios';
import { Export } from 'src/exports/entities/export.entity';

@Injectable()
export class PurchasesService {
  private agoDateGc: string;
  private nowDateGc: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Export)
    private readonly exportsRepository: Repository<Export>,
  ) {
    const now = new Date();
    const quarterAgo = new Date(now);
    quarterAgo.setDate(quarterAgo.getDate() - 1);
    this.agoDateGc = quarterAgo.toISOString().split('T')[0];
    this.nowDateGc = now.toISOString().split('T')[0];
  }

  async requestPurchaseId() {
    try {
      const apiKey = this.configService.get('GC_API_KEY');
      const PREFIX = this.configService.get('GC_PREFIX');
      const result = await axios.get(
        `${PREFIX}/payments?key=${apiKey}&created_at[to]=${this.nowDateGc}`,
      );
      this.exportsRepository.save({
        name: 'Экспорт покупок Азат',
        export_id: result.data.info.export_id,
        status: 'ready',
      });
    } catch (error) {}
  }

  async requestExportId() {
    try {
      const apiKey = this.configService.get('GC_API_KEY');
      const PREFIX = this.configService.get('GC_PREFIX');
      const export_id = await this.exportsRepository.findOne({
        where: {
          status: 'ready',
        },
      });
      const result = await axios.get(
        `${PREFIX}/exports/${export_id.export_id}?key=${apiKey}`,
      );
      console.log(result.data);
      this.writeExportData(result);
      return result;
    } catch (error) {}
  }

  async writeExportData(data: AxiosResponse) {
    try {
      const newData: string[][] = data.data.info.items;
      const arrOfObjects: any[] = [];
      newData.forEach((item) => {
        arrOfObjects.push({
          purchaseId: item[0],
          user: item[1],
          email: item[2],
          product: item[3],
          createdAt: item[4],
          type: item[5],
          status: item[6],
          price: item[7],
          payFee: item[8],
          payedPrice: item[9],
          codePayment: item[10],
          productTitle: item[11],
        });
      });
      console.log('Количество оплаченных заказов: ', arrOfObjects.length);

      const batchSize: number = 100;
      for (let i = 0; i < arrOfObjects.length; i += batchSize) {
        const batch = arrOfObjects.slice(i, i + batchSize);
        const promises = batch.map(async (item: CreatePurchaseDto) => {
          const existingItem = await this.purchaseRepository.findOne({
            where: {
              purchaseId: item.purchaseId,
            },
          });
          if (existingItem) {
            await this.purchaseRepository.update(
              { purchaseId: existingItem.purchaseId },
              item,
            );
          } else {
            this.purchaseRepository.save(item);
          }
        });
        await Promise.all(promises);
        console.log('Processed batch of payments: ', i);
      }
    } catch (error) {}
  }
}
