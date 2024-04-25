import { PartialType } from '@nestjs/mapped-types';
import { CreateEnkodDto } from './create-enkod.dto';

export class UpdateEnkodDto extends PartialType(CreateEnkodDto) {}
