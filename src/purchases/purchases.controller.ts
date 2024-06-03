import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Cron } from '@nestjs/schedule';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Cron('47 19 * * *')
  @Get('id')
  async createRequest() {
    this.purchasesService.requestPurchaseId();
  }

  @Cron('17 21 * * *')
  @Get('id/export')
  async makeExportById() {
    try {
      const findedExports = await this.purchasesService.requestExportId();
    } catch (error) {}
  }
}
