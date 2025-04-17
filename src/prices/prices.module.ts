import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PrismaService } from 'prisma/prisma.service';
import { PricesController } from './prices.controller';

@Module({
  controllers: [PricesController],
  providers: [PricesService, PrismaService],
})
export class PricesModule {}
