import { Injectable } from '@nestjs/common';
import { CreateNullsaleDto } from './dto/create-nullsale.dto';
import { UpdateNullsaleDto } from './dto/update-nullsale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nullsale } from './entities/nullsale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NullsalesService {
  constructor(
    @InjectRepository(Nullsale)
    private readonly nullSalesRepository: Repository<Nullsale>,
  ) {}
  create(createNullsaleDto: CreateNullsaleDto) {
    return 'This action adds a new nullsale';
  }

  findAll() {
    return `This action returns all nullsales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nullsale`;
  }

  update(id: number, updateNullsaleDto: UpdateNullsaleDto) {
    return `This action updates a #${id} nullsale`;
  }

  remove(id: number) {
    return `This action removes a #${id} nullsale`;
  }
}
