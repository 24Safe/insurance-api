import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePolicyholderDto {
  @IsString()
  @IsDefined()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  dateOfBirth?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  street?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  city?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  zip?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  country?: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  uniqueMasterCitizenNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  passportNumber?: string;

  @IsEnum(Gender)
  @IsOptional()
  @ApiProperty({ enum: Gender })
  gender: Gender;
}

export class UpdatePolicyholderDto extends PartialType(CreatePolicyholderDto) {}
