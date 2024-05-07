import { Module } from '@nestjs/common';
import { NullsalesService } from './nullsales.service';
import { NullsalesController } from './nullsales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nullsale } from './entities/nullsale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nullsale])],
  controllers: [NullsalesController],
  providers: [NullsalesService],
})
export class NullsalesModule {}
