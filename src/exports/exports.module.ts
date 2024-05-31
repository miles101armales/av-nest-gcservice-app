import { Module } from '@nestjs/common';
import { ExportsService } from './exports.service';
import { ExportsController } from './exports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Export } from './entities/export.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { Nullsale } from 'src/nullsales/entities/nullsale.entity';
import { Purchase } from 'src/purchases/entities/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Export, Sale, Nullsale])],
  controllers: [ExportsController],
  providers: [ExportsService],
})
export class ExportsModule {}
