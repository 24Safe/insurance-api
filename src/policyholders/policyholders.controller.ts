import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PolicyholdersService } from './policyholders.service';
import {
  CreatePolicyholderDto,
  UpdatePolicyholderDto,
} from './policyholders.dto';

@ApiTags('Policyholders')
@Controller('policyholders')
export class PolicyholdersController {
  constructor(private service: PolicyholdersService) {}

  @Get()
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Do not implement',
    description: 'Endpoint used for testing purposes. Do not implement this',
  })
  public async getAll() {
    return await this.service.getAll();
  }

  @Post()
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Do not implement',
    description: 'Endpoint used for testing purposes. Do not implement this',
  })
  public async create(@Body() body: CreatePolicyholderDto) {
    return await this.service.create(body);
  }

  @Patch(':id')
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Do not implement',
    description: 'Endpoint used for testing purposes. Do not implement this',
  })
  public async update(
    @Param('id') id: number,
    @Body() body: UpdatePolicyholderDto,
  ) {
    return await this.service.update(id, body);
  }
}
