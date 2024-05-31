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

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get('id')
  async createRequest() {
    this.purchasesService.requestPurchaseId();
  }

  @Get('id/export')
  async makeExportById() {
    try {
      const findedExports = await this.purchasesService.requestExportId();
    } catch (error) {}
  }
}
