import { PartialType } from '@nestjs/mapped-types';
import { CreateNullsaleDto } from './create-nullsale.dto';

export class UpdateNullsaleDto extends PartialType(CreateNullsaleDto) {}
