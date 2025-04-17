import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  public async getAll() {
    return await this.prisma.services.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
