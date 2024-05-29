import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ExportsService } from './exports.service';
import { UpdateExportDto } from './dto/update-export.dto';
import { Cron } from '@nestjs/schedule';

@Controller('exports')
export class ExportsController {
  private readonly logger = new Logger(ExportsController.name);

  constructor(private readonly exportsService: ExportsService) {}

  @Cron('16 19 * * *')
  @Get('id')
  async createExportId() {
    try {
      this.logger.log(
        'Создаем ID экспорта запросов в геткурс и записываем в БД экспортов',
      );
      this.exportsService.createRequest();
    } catch (error) {}
    return;
  }

  @Cron('46 20 * * *')
  @Get('id/export')
  async makeExportById() {
    try {
      const findedExports = await this.exportsService.findByStatus('creating');
      if (!findedExports) {
        console.log('Экспортов для выгрузки не найдено');
      }
      this.exportsService.exportDataFromExports(findedExports);
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExportDto: UpdateExportDto) {
    return this.exportsService.update(+id, updateExportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exportsService.remove(+id);
  }
}
