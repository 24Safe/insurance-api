import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiSecurity } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  @ApiSecurity('api-key')
  public async ping() {
    return { message: 'Success' };
  }
}
