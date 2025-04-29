import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CoverageTemplatesService {
  constructor(private prisma: PrismaService) {}

  public async getAll() {
    return await this.prisma.coverageTemplates.findMany({
      select: {
        id: true,
        name: true,
        level: true,
        type: true,
        parents: {
          select: {
            parent: {
              select: {
                id: true,
                type: true,
                name: true,
                level: true,
              },
            },
          },
        },
      },
    });
  }
}
