import { Module } from '@nestjs/common';
import { EnkodService } from './enkod.service';
import { EnkodController } from './enkod.controller';

@Module({
  controllers: [EnkodController],
  providers: [EnkodService],
})
export class EnkodModule {}
