import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PolicyService } from './policies.service';
import { PolicyController } from './policies.controller';

@Module({
  providers: [PolicyService, PrismaService],
  controllers: [PolicyController],
})
export class PolicyModule {}
