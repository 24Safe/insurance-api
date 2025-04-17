// main.ts
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiKeyGuard } from './auth/api-key.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Demo insurance API')
    .setDescription('API description')
    .setVersion('1.0.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Swagger UI at /api

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties not defined in DTO
      forbidNonWhitelisted: true, // throws if unknown values are present
      transform: true, // auto-transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // auto-convert types like string to number
      },
    }),
  );
  const configService = app.get(ConfigService);

  app.useGlobalGuards(new ApiKeyGuard(configService));

  await app.listen(port);
}
bootstrap();
