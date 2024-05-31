import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Export } from 'src/exports/entities/export.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Export])],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
