import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateExportDto {
  @IsString()
  name: string;

  @IsNumber()
  export_id: number;

  status: 'creating' | 'exported';
}
