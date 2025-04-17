import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ServicesModule } from './services/services.module';
import { AssociatesModule } from './associates/associates.module';
import { CoverageTemplatesModule } from './coverage-templates/coverage-templates.module';
import { PricesModule } from './prices/prices.module';
import { PolicyModule } from './policies/policies.module';
import { PolicyholdersModule } from './policyholders/policyholders.module';
import { WebhookModule } from './webhook/webhook.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PolicyModule,
    ServicesModule,
    CoverageTemplatesModule,
    AssociatesModule,
    PricesModule,
    PolicyholdersModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
