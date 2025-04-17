import {
  IsDefined,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PolicyType } from '@prisma/client';

export class SearchPolicyDto {
  @IsDefined()
  @IsEnum(PolicyType)
  @ApiProperty({ enum: PolicyType })
  type: PolicyType;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  passportNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  policyNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  insuranceCardNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  contractorName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  lastName?: string;

  @IsISO8601()
  @IsOptional()
  @ApiProperty({ required: false })
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  vinNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  licensePlate?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  uniqueMasterCitizenNumber?: string;
}

export class ImportDto {
  @IsNumber()
  @ApiProperty()
  id: number;
}
