import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NullsalesService } from './nullsales.service';
import { CreateNullsaleDto } from './dto/create-nullsale.dto';
import { UpdateNullsaleDto } from './dto/update-nullsale.dto';

@Controller('nullsales')
export class NullsalesController {
  constructor(private readonly nullsalesService: NullsalesService) {}

  @Post()
  create(@Body() createNullsaleDto: CreateNullsaleDto) {
    return this.nullsalesService.create(createNullsaleDto);
  }

  @Get()
  findAll() {
    return this.nullsalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nullsalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNullsaleDto: UpdateNullsaleDto) {
    return this.nullsalesService.update(+id, updateNullsaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nullsalesService.remove(+id);
  }
}
