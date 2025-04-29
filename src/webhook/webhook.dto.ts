import { ApiProperty } from '@nestjs/swagger';
import { CaseServiceStatus, DocumentType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { FileSystemStoredFile, IsFile } from 'nestjs-form-data';

export class CoverageDto {
  @IsInt()
  @IsDefined()
  @ApiProperty()
  coverageId: number;

  @IsString()
  @IsDefined()
  @ApiProperty()
  coverageName: string;

  @IsInt()
  @IsDefined()
  @ApiProperty()
  level: number;
}

export class StatusChangedDto {
  @IsEnum(CaseServiceStatus)
  @IsDefined()
  @ApiProperty({ enum: CaseServiceStatus })
  status: CaseServiceStatus;

  @IsString()
  @IsDefined()
  @ApiProperty()
  caseRefNumber: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  caseServiceRefNumber: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  serviceName: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  serviceId: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  associateName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  associateId: string;

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty()
  lineItems?: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  invoiceNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  diagnosis?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  symptoms?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  appointmentDateAndTime: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  serviceDeliveredAt: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  lastStatusUpdateAt: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  documentationCompletedAt: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  liquidatedAt: Date;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  totalPrice: number;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  coveredAmount: number;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  participationAmount: number;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  networkAmount: number;

  @IsDefined()
  @Type(() => CoverageDto)
  @ApiProperty({ type: CoverageDto })
  coverages: CoverageDto[];

  @IsString()
  @IsDefined()
  @ApiProperty()
  policyName: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  policyNumber: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  insuranceCardNumber: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  policyholderFirstName: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  policyholderLastName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  policyholderNIN: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  policyholderDateOfBirth: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  city: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  country: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  currency: string;
}

export class FileMetadataDto {
  @IsString()
  @ApiProperty({
    description:
      'The display name or label of the file. This can be a title or short description.',
  })
  name: string;

  @IsEnum(DocumentType)
  @ApiProperty({
    enum: DocumentType,
    description: 'Type of the uploaded document',
  })
  type: string;
}

export class DocumentsUploadDto {
  @IsString()
  @IsDefined()
  @ApiProperty()
  caseId: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  caseServiceId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FileMetadataDto)
  @ApiProperty({ type: FileMetadataDto })
  metadata: FileMetadataDto[];

  @IsFile({ each: true })
  @IsDefined()
  @ApiProperty({ type: FileSystemStoredFile })
  files: FileSystemStoredFile[];
}
