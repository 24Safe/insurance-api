import { Injectable } from '@nestjs/common';
import { ImportDto, SearchPolicyDto } from './policies.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PolicyService {
  constructor(private prisma: PrismaService) {}

  public async search(params: SearchPolicyDto) {
    const {
      type,
      policyNumber,
      insuranceCardNumber,
      contractorName,
      vinNumber,
      licensePlate,
      ...rest
    } = params;
    const policies = await this.prisma.policies.findMany({
      include: {
        policyholder: true,
      },
      where: {
        type,
        policyNumber,
        insuranceCardNumber,
        contractorName,
        vinNumber,
        licensePlate,
        policyholder: {
          ...rest,
        },
      },
    });
    return policies.map((policy) => ({
      id: policy.id,
      policyNumber: policy.policyNumber,
      insuranceCardNumber: policy.insuranceCardNumber,
      status: policy.status,
      firstName: policy.policyholder.firstName,
      lastName: policy.policyholder.lastName,
      dateOfBirth: policy.policyholder.dateOfBirth,
      contractorName: policy.contractorName,
      start: policy.start,
      end: policy.end,
    }));
  }
  /**
   *
   * @param params
   */
  public async import(params: ImportDto) {
    return await this.prisma.policies.findUnique({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        name: true,
        limitType: true,
        limit: true,
        contractorName: true,
        insuranceStart: true,
        start: true,
        end: true,
        policyNumber: true,
        insuranceCardNumber: true,
        type: true,
        limitUsage: true,
        licensePlate: true,
        vinNumber: true,
        color: true,
        vehicleMake: true,
        vehicleModel: true,
        year: true,
        status: true,
        coverages: {
          where: {
            level: 3,
          },
          include: {
            children: {
              where: {
                level: 2,
              },
              include: {
                children: {
                  where: {
                    level: 1,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
