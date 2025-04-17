import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { SearchAssociatesDto } from './associates.dto';
import { AssociatesService } from './associates.service';

@ApiTags('Associates')
@Controller('associates')
export class AssociatesController {
  constructor(private service: AssociatesService) {}

  @Get('delta')
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Returns changes on associates',
    description:
      'This endpoint should return all associates that are created or updated in from-to date range',
  })
  public async search(@Query() query: SearchAssociatesDto) {
    return this.service.search(query);
  }
}
