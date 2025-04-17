import { Module } from '@nestjs/common';
import { CoverageTemplatesService } from './coverage-templates.service';
import { CoverageTemplatesController } from './coverage-templates.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [CoverageTemplatesService, PrismaService],
  controllers: [CoverageTemplatesController],
})
export class CoverageTemplatesModule {}
