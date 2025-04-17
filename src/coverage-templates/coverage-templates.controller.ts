import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CoverageTemplatesService } from './coverage-templates.service';

@ApiTags('Coverage templates')
@Controller('coverage-templates')
export class CoverageTemplatesController {
  constructor(private coverageTemplatesService: CoverageTemplatesService) {}

  @Get('')
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Get all coverages',
    description:
      'Returns a list of coverages and sub coverages and their relations with insurance IDs',
  })
  public async getAll() {
    return await this.coverageTemplatesService.getAll();
  }
}
