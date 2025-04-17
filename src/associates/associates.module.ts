import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AssociatesService } from './associates.service';
import { AssociatesController } from './associates.controller';

@Module({
  controllers: [AssociatesController],
  providers: [AssociatesService, PrismaService],
})
export class AssociatesModule {}
