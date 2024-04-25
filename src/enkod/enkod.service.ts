import { Injectable } from '@nestjs/common';
import { CreateEnkodDto } from './dto/create-enkod.dto';
import { UpdateEnkodDto } from './dto/update-enkod.dto';

@Injectable()
export class EnkodService {
  create(createEnkodDto: CreateEnkodDto) {
    return 'This action adds a new enkod';
  }

  findAll() {
    return `This action returns all enkod`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enkod`;
  }

  update(id: number, updateEnkodDto: UpdateEnkodDto) {
    return `This action updates a #${id} enkod`;
  }

  remove(id: number) {
    return `This action removes a #${id} enkod`;
  }
}
