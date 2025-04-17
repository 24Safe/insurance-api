import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreatePriceDto, SearchPricesDto } from './prices.dto';
import { PricesService } from './prices.service';

@ApiTags('Prices')
@Controller('prices')
export class PricesController {
  constructor(private service: PricesService) {}

  @Post()
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Do not implement',
    description: 'Endpoint used for testing purposes. Do not implement this',
  })
  public async create(@Body() body: CreatePriceDto) {
    return await this.service.create(body);
  }

  @Patch(':id')
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Do not implement',
    description: 'Endpoint used for testing purposes. Do not implement this',
  })
  public async update(@Param() id: number, @Body() body: CreatePriceDto) {
    return await this.service.create(body);
  }

  @Get('delta')
  @ApiSecurity('api-key')
  @ApiOperation({
    summary: 'Returns changes on prices',
    description:
      'This endpoint should return all prices that are created or updated in from-to date range',
  })
  public async delta(@Query() params: SearchPricesDto) {
    return await this.service.delta(params);
  }
}
