import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { Export } from 'src/exports/entities/export.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(private readonly configService: ConfigService) {}
  create(createSaleDto: CreateSaleDto) {
    return 'This action adds a new sale';
  }

  findAll() {
    return `This action returns all sales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
