import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePriceDto, SearchPricesDto, UpdatePriceDto } from './prices.dto';

@Injectable()
export class PricesService {
  constructor(private prisma: PrismaService) {}

  public async create(dto: CreatePriceDto) {
    return await this.prisma.prices.create({
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  }

  public async update(id, dto: UpdatePriceDto) {
    return await this.prisma.prices.update({
      where: {
        id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  }
  /**
   *
   * @param param0
   * @returns
   */
  public async delta({ from, to }: SearchPricesDto) {
    return await this.prisma.prices.findMany({
      where: {
        AND: {
          updatedAt: {
            gte: from,
            lt: to,
          },
        },
      },
    });
  }
}
