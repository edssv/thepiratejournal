import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { join } from 'path';

import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: [configService.get('app.clientDomain'), configService.get('app.dashboardDomain')],
  });
  app.setGlobalPrefix(configService.get('app.apiPrefix'));
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    '/' + configService.get('app.assetsPrefix'),
    express.static(join(__dirname, '..', configService.get('app.uploadFolder')))
  );

  await app.listen(5000);
}

bootstrap();
