import { Injectable, LoggerService } from '@nestjs/common';
import { UpdateExportDto } from './dto/update-export.dto';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { Between, Repository } from 'typeorm';
import { Export } from './entities/export.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from 'src/sales/entities/sale.entity';
import { Nullsale } from 'src/nullsales/entities/nullsale.entity';
import { CreateSaleDto } from 'src/sales/dto/create-sale.dto';
import { CreateNullsaleDto } from 'src/nullsales/dto/create-nullsale.dto';
import { Purchase } from 'src/purchases/entities/purchase.entity';
import { CreatePurchaseDto } from 'src/purchases/dto/create-purchase.dto';

@Injectable()
export class ExportsService {
  private agoDateGc: string;
  private nowDateGc: string;
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Export)
    private readonly exportsRepository: Repository<Export>,
    @InjectRepository(Sale)
    private readonly salesRepository: Repository<Sale>,
    @InjectRepository(Nullsale)
    private readonly nullSalesRepository: Repository<Nullsale>,
  ) {
    const now = new Date();
    const quarterAgo = new Date(now);
    // quarterAgo.setMonth(quarterAgo.getMonth() - 1);
    quarterAgo.setDate(quarterAgo.getDate() - 1);
    this.agoDateGc = quarterAgo.toISOString().split('T')[0];
    this.nowDateGc = now.toISOString().split('T')[0];
  }
  async createRequest(): Promise<Export> {
    const response = await this.requestExportId();
    return await this.createExportId(response, 3, 60000);
  }

  async findByStatus(status: 'creating' | 'exported') {
    return this.exportsRepository.find({
      where: {
        status,
      },
    });
  }

  async getSalesByDate(month: string) {
    return await this.salesRepository.find({
      where: {
        createdAt: Between(
          `2024-${month}-01 00:00:00`,
          `${this.nowDateGc} 23:59:59`,
        ),
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} export`;
  }

  update(id: number, updateExportDto: UpdateExportDto) {
    return `This action updates a #${id} export`;
  }

  remove(id: number) {
    return `This action removes a #${id} export`;
  }

  async exportDataFromExports(exports: Export[]) {
    try {
      for (const _export of exports) {
        const result = await this.makeExport(_export.export_id);
        console.log(
          `Export data with ID: ${_export.export_id} has been exported`,
        );
        await this.writeExportData(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async requestExportId() {
    try {
      const apiKey = this.configService.get('GC_API_KEY');
      const PREFIX = this.configService.get('GC_PREFIX');
      const result = await axios.get(
        `${PREFIX}/deals?key=${apiKey}&created_at[from]=${this.agoDateGc}&created_at[to]=${this.nowDateGc}`,
      );
      // console.log(
      //   `${PREFIX}/deals?key=${apiKey}&created_at[from]=${this.agoDateGc}&created_at[to]=${this.nowDateGc}`,
      // );
      console.log('Запрос на получение Export ID отправлен');
      if (result.status == 200) {
        return result;
      } else {
        console.error('Ошибка получения ID экспорта');
      }
    } catch (error) {
      console.error(error);
    }
  }
  // Создание ID экспорта для последующей работы с данными
  async createExportId(
    response: AxiosResponse,
    maxRetries: number,
    delayMs: number,
  ): Promise<Export> {
    try {
      if (!response) {
        console.error('Не выгружен файл экспорта');
      }
      if (!response.data.success) {
        if (maxRetries > 0) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          console.log(new Date(), 'Retry ', maxRetries - 1);
          return this.createExportId(response, maxRetries - 1, delayMs);
        } else {
          throw new Error('Max retries exceeded');
        }
      }
      const export_id = response.data.info.export_id;
      const newExport = this.exportsRepository.save({
        name: 'Экспорт заказов Азат',
        export_id,
        status: 'creating',
      });
      console.log('Export ID сохранен');
      return newExport;
    } catch (error) {
      return;
    }
  }

  async makeExport(export_id: number) {
    try {
      const apiKey = this.configService.get('GC_API_KEY');
      const PREFIX = this.configService.get('GC_PREFIX');
      const result = await axios.get(
        `${PREFIX}/exports/${export_id}?key=${apiKey}`,
      );
      if (result.data.error && result.data.error_code === 910) {
        await this.exportsRepository.update(
          { id: export_id },
          { status: 'bad_export_id' },
        );
        throw new Error('Файл не создан, попробуйте другой фильтр');
      }
      this.exportsRepository.update(
        { export_id: export_id },
        { status: 'exported' },
      );
      return result;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async writeExportData(data: AxiosResponse): Promise<Sale> {
    try {
      // получаем данные из makeExport
      const newData: string[][] = data.data.info.items;
      const nullArrOfObjects: any[] = [];
      const realArrOfObjects: any[] = [];
      newData.forEach((item) => {
        if (Number(item[10]) === 0) {
          const tagItemIndex = item.length - 2;
          nullArrOfObjects.push({
            idSystemGc: item[0],
            idAzatGc: item[1],
            idUserGc: item[2],
            userName: item[3],
            userEmail: item[4],
            userPhone: item[5],
            createdAt: item[6],
            payedAt: item[7],
            orderName: item[8],
            dealStatus: item[9],
            price: item[10],
            payedPrice: item[11],
            payFee: item[12],
            income: item[13],
            taxes: item[14],
            profit: item[15],
            otherFee: item[16],
            netProfit: item[17],
            managerName: item[19],
            city: item[20],
            payedBy: item[21],
            promocodeUsed: item[23],
            promoCompany: item[24],
            utmSource: item[46],
            utmMedium: item[47],
            utmCampaign: item[48],
            utmContent: item[49],
            utmTerm: item[50],
            utmGroup: item[51],
            workWithOrder: item[25],
            orderComments: item[26],
            rejectReason: item[27],
            orderTag: JSON.stringify(item[tagItemIndex]).replace(
              /[[\]]/g,
              'tag: ',
            ),
          });
        } else {
          const tagItemIndex = item.length - 2;
          realArrOfObjects.push({
            idSystemGc: item[0],
            idAzatGc: item[1],
            idUserGc: item[2],
            userName: item[3],
            userEmail: item[4],
            userPhone: item[5],
            createdAt: item[6],
            payedAt: item[7],
            orderName: item[8],
            dealStatus: item[9],
            price: item[10],
            payedPrice: item[11],
            payFee: item[12],
            income: item[13],
            taxes: item[14],
            profit: item[15],
            otherFee: item[16],
            netProfit: item[17],
            managerName: item[19],
            city: item[20],
            payedBy: item[21],
            promocodeUsed: item[23],
            promoCompany: item[24],
            utmSource: item[46],
            utmMedium: item[47],
            utmCampaign: item[48],
            utmContent: item[49],
            utmTerm: item[50],
            utmGroup: item[51],
            workWithOrder: item[25],
            orderComments: item[26],
            rejectReason: item[27],
            orderTag: JSON.stringify(item[tagItemIndex]).replace(/[[\]]/g, ''),
          });
        }
      });

      console.log('Количество обычных заказов: ', realArrOfObjects.length);
      console.log('Количество нулевых заказов: ', nullArrOfObjects.length);

      const batchSize: number = 100;

      const sales: Sale[] = await this.salesRepository.find({
        where: {
          createdAt: Between(
            `${this.agoDateGc} 00:00:00`,
            `${this.nowDateGc} 23:59:59`,
          ),
        },
      });

      for (let i = 0; i < nullArrOfObjects.length; i += batchSize) {
        const batch = nullArrOfObjects.slice(i, i + batchSize);
        const promises = batch.map(async (item: CreateNullsaleDto) => {
          const existingItem = await this.nullSalesRepository.findOne({
            where: {
              idSystemGc: item.idSystemGc,
            },
          });
          if (existingItem) {
            await this.nullSalesRepository.update(
              { idSystemGc: existingItem.idSystemGc },
              item,
            );
          } else {
            this.nullSalesRepository.save(item);
          }
        });
        await Promise.all(promises);
        console.log('Processed batch of null orders: ', i);
      }

      for (let i = 0; i < realArrOfObjects.length; i += batchSize) {
        const batch = realArrOfObjects.slice(i, i + batchSize);
        const promises = batch.map(async (item: CreateSaleDto) => {
          const existingItem = await this.salesRepository.findOne({
            where: {
              idSystemGc: item.idSystemGc,
            },
          });
          if (existingItem) {
            await this.salesRepository.update(
              { idSystemGc: existingItem.idSystemGc },
              item,
            );
          } else {
            this.salesRepository.save(item);
          }
        });
        await Promise.all(promises);
        console.log('Processed batch of ordinary orders: ', i);
      }

      if (sales.length > 0) {
        await this.compareData(realArrOfObjects);
      }
      return null;
    } catch (error) {
      console.error('Error in writeExportData: ', error);
      return null;
    }
  }

  async compareData(realArrOfObjects: any[]) {
    const sales: Sale[] = await this.salesRepository.find({
      where: {
        createdAt: Between(
          `${this.agoDateGc} 00:00:00`,
          `${this.nowDateGc} 23:59:59`,
        ),
      },
    });

    for (const item of sales) {
      const existingItem = realArrOfObjects.some(
        (el) => el.idSystemGc.toString() === item.idSystemGc.toString(),
      );
      console.log(existingItem);
      if (!existingItem) {
        await this.salesRepository.update(
          { idSystemGc: item.idSystemGc },
          { dealStatus: 'Ложный' },
        );
      }
    }
    // await Promise.all(promises);
    console.log('Comparison completed');
  }
}
