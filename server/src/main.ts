import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.enableCors({
        credentials: true,
        origin: [configService.get('app.clientUrl'), configService.get('app.controlUrl')],
    });
    app.setGlobalPrefix(configService.get('app.apiPrefix'));
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(5000);
}

bootstrap();
