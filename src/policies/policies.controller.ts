import { PolicyService } from './policies.service';
import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ImportDto, SearchPolicyDto } from './policies.dto';
import { ImportResponseDto, SearchResponseDto } from './policies.interface';

@ApiTags('Policy')
@Controller('policy')
export class PolicyController {
  constructor(private service: PolicyService) {}

  @Get('search')
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Policies search',
    description: 'Allows 24Safe to search through policies',
  })
  @ApiOkResponse({
    description: 'List of policies',
    type: [SearchResponseDto],
  })
  async search(@Query() query: SearchPolicyDto) {
    return this.service.search(query);
  }

  @Get('import')
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Policies import',
    description: 'Allows 24Safe to import policy from insurance',
  })
  @ApiOkResponse({
    description: 'Returns policy details',
    type: [ImportResponseDto],
  })
  async import(@Query() query: ImportDto) {
    return this.service.import(query);
  }
}
