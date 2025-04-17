import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePriceDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  serviceName: string;

  @IsInt()
  @IsDefined()
  @ApiProperty()
  serviceId: number;

  @IsInt()
  @IsDefined()
  @ApiProperty()
  associateId: number;

  @IsInt()
  @IsDefined()
  @ApiProperty()
  price: number;
}

export class UpdatePriceDto extends PartialType(CreatePriceDto) {}

export class SearchPricesDto {
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  from: Date;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  to: Date;
}
