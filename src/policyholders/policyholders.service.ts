import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  CreatePolicyholderDto,
  UpdatePolicyholderDto,
} from './policyholders.dto';

@Injectable()
export class PolicyholdersService {
  constructor(private prisma: PrismaService) {}
  /**
   *
   * @returns
   */
  public async getAll() {
    return await this.prisma.policyholders.findMany({});
  }
  /**
   *
   * @param dto
   * @returns
   */
  public async create(dto: CreatePolicyholderDto) {
    return await this.prisma.policyholders.create({
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  }
  /**
   *
   * @param id
   * @param dto
   * @returns
   */
  public async update(id: number, dto: UpdatePolicyholderDto) {
    return await this.prisma.policyholders.update({
      where: { id },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  }
}
