import { Controller, Get } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private service: ServicesService) {}

  @Get()
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Get all services',
    description: 'Return Insurance IDs for 24Safe services',
  })
  async search() {
    return this.service.getAll();
  }
}
