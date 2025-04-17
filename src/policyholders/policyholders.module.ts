import { Module } from '@nestjs/common';
import { PolicyholdersController } from './policyholders.controller';
import { PolicyholdersService } from './policyholders.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PolicyholdersController],
  providers: [PolicyholdersService, PrismaService],
})
export class PolicyholdersModule {}
