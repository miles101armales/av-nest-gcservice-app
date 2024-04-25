import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { EnkodService } from './enkod.service';
import { CreateEnkodDto } from './dto/create-enkod.dto';
import { UpdateEnkodDto } from './dto/update-enkod.dto';

@Controller('enkod')
export class EnkodController {
  constructor(private readonly enkodService: EnkodService) {}

  @Post()
  create(@Body() createEnkodDto: CreateEnkodDto) {
    return this.enkodService.create(createEnkodDto);
  }

  @Get()
  findAll() {
    return this.enkodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enkodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnkodDto: UpdateEnkodDto) {
    return this.enkodService.update(+id, updateEnkodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enkodService.remove(+id);
  }
}
