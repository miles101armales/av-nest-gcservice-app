import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { SalesController } from './sales/sales.controller';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/')
  async getHello() {
    this.appService.getHello();
  }
}
