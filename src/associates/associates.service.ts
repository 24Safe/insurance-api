import { Injectable } from '@nestjs/common';
import { SearchAssociatesDto } from './associates.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AssociatesService {
  constructor(private prisma: PrismaService) {}
  /**
   *
   */
  public async search({ from, to }: SearchAssociatesDto) {
    return await this.prisma.associates.findMany({
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
