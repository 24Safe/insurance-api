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
        parents: {
          select: {
            parent: {
              select: {
                id: true,
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
