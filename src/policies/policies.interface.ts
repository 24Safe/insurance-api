import { ApiProperty } from '@nestjs/swagger';
import { LimitType, PolicyType } from '@prisma/client';

enum PolicyStatus {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
}

export class SearchResponseDto {
  @ApiProperty({ example: 123, description: 'Policy ID' })
  id: number;

  @ApiProperty({ example: 'PN-123', description: 'Policy number' })
  policyNumber: string;

  @ApiProperty({
    example: '00002356',
    description: 'Other names: Health Card number',
  })
  insuranceCardNumber: string;

  @ApiProperty({
    enum: PolicyStatus,
    description:
      'If policy is terminated before end date this fields should indicate that',
  })
  status: PolicyStatus;

  @ApiProperty({ example: 'Petar' })
  firstName: string;

  @ApiProperty({ example: 'Petrovic' })
  lastName: string;

  @ApiProperty({ example: new Date() })
  dateOfBirth: Date;

  @ApiProperty({ example: 'FensiCo DOO' })
  contractorName: string;

  @ApiProperty({ example: new Date() })
  start: Date;

  @ApiProperty({ example: new Date() })
  end: Date;
}

export class CoveragesDto {
  @ApiProperty({
    required: true,
    description:
      'Global identifier for coverage. This ID will be used when sending reports.',
  })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({
    required: true,
    enum: LimitType,
    description:
      'Limit type of the coverage. Examples: LIMIT - 10 000 EUR; NO_LIMIT; NUMBER_OF_OCCURRENCES - 5 (five usages of coverage); PER_SERVICE - 50 (50 EUR PER SERVICE)',
  })
  limitType: LimitType;

  @ApiProperty({
    required: true,
    description: 'Numerical value of limit. In case of NO_LIMIT it is ignored.',
  })
  limit: number;

  @ApiProperty({
    required: true,
    description: 'Current usage of limit. Ignored in case of NO_LIMIT',
  })
  limitUsage: number;

  @ApiProperty({
    required: false,
    description: 'Numerical value of limit. In case of NO_LIMIT it is ignored.',
  })
  subLimit: number;

  @ApiProperty({
    required: false,
    enum: LimitType,
    description:
      'Sub Limit type of the coverage. Limit and Sub Limit could be combined. Example: LIMIT 100 EUR, SUB LIMIT 5 OCCURRENCES. This means that coverage could be used up to 100 EUR or 5 times',
  })
  subLimitType: LimitType;

  @ApiProperty({
    required: false,
    description: 'Current usage of sub limit. Ignored in case of NO_LIMIT',
  })
  subLimitUsage: number;

  @ApiProperty({
    required: false,
    description: 'Parent coverage. For sub coverage it will be coverage id',
  })
  parentId: number;

  @ApiProperty({
    required: true,
    description:
      'Level of coverage. For SubCoverage it is 1 (for level 1 we connect services), for Coverage level 2, Coverage package level 3 etc. Useful when creating PNP and PZO policies that lower levels of complexity',
  })
  level: number;

  @ApiProperty({ required: false })
  note: string;

  @ApiProperty({ required: true })
  participation: number;

  @ApiProperty({ type: [CoveragesDto] })
  children: CoveragesDto[];
}

export class ImportResponseDto {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({
    required: true,
    enum: LimitType,
    description:
      'Limit type of the policy. Examples: LIMIT - 10 000 EUR; NO_LIMIT; NUMBER_OF_OCCURRENCES - 5 (five usages of policy); PER_SERVICE - 50 (50 EUR PER SERVICE)',
  })
  limitType: LimitType;

  @ApiProperty({
    required: true,
    description: 'Numerical value of limit. In case of NO_LIMIT it is ignored.',
  })
  limit: number;

  @ApiProperty({
    required: false,
    description: 'Person or entity that signed contract',
  })
  contractorName: string;

  @ApiProperty({
    required: true,
    description: 'Insurance start date for policyholder',
  })
  insuranceStart: Date;

  @ApiProperty({
    required: true,
    description:
      'Insurance end date for policyholder. For example: In case of termination of contract for employee.',
  })
  insuranceEnd: Date;

  @ApiProperty({
    required: true,
    description:
      'Policy start date. For individual policies it is the same as insuranceStart, for collective maybe different',
  })
  start: Date;

  @ApiProperty({
    required: true,
    description:
      'Policy end date. For individual policies it is the same as insuranceStart, for collective maybe different',
  })
  end: Date;

  @ApiProperty({
    required: true,
    description: 'For collective policies the same for all employees',
  })
  policyNumber: string;

  @ApiProperty({
    required: true,
    description:
      'Individual insurance card number. Unique for every employee. Can remain same when extending policies',
  })
  insuranceCardNumber: string;

  @ApiProperty({ required: true, enum: PolicyType })
  type: PolicyType;

  @ApiProperty({
    required: true,
    description: 'Current usage of limit. Ignored in case of NO_LIMIT',
  })
  limitUsage: number;

  @ApiProperty({ required: false, description: 'Required for PNP policies' })
  licensePlate: string;

  @ApiProperty({ required: false, description: 'Required for PNP policies' })
  vinNumber: string;

  @ApiProperty({ required: false, description: 'Required for PNP policies' })
  color: string;

  @ApiProperty({ required: false, description: 'Required for PNP policies' })
  vehicleMake: string;

  @ApiProperty({ required: false, description: 'Required for PNP policies' })
  vehicleModel: string;

  @ApiProperty({ required: false, description: 'Required for PNP policies' })
  year: string;

  @ApiProperty({ required: true, enum: PolicyStatus })
  status: PolicyStatus;

  @ApiProperty({ type: [CoveragesDto] })
  coverages: CoveragesDto[];

  @ApiProperty({ description: 'ISO 4217 currency code' })
  currency: string;
}
