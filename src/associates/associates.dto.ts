import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchAssociatesDto {
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  from: Date;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  to: Date;
}
