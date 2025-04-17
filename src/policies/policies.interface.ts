import { ApiProperty } from '@nestjs/swagger';
import { LimitType } from '@prisma/client';

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

export class ImportResponseDto {
  // "id": number;
  // "name": string;
  // "limitType": LimitType;
  // "limit": number;
  // "contractorName": string;
  // "insuranceStart": Date;
  // "start": Date;
  // "end": Date;
  // "policyNumber": string;
  // "insuranceCardNumber": "CARD123456",
  // "type": "DZO",
  // "limitUsage": 0,
  // "licensePlate": null,
  // "vinNumber": null,
  // "color": null,
  // "vehicleMake": null,
  // "vehicleModel": null,
  // "year": null,
  // "status": "ACTIVE",
}
