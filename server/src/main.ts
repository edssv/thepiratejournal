import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.enableCors({
        credentials: true,
        origin: [configService.get('app.clientDomain'), configService.get('app.dashboardDomain')],
    });
    app.setGlobalPrefix(configService.get('app.apiPrefix'));
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(5000);
}

bootstrap();
