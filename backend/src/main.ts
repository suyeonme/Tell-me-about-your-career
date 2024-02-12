import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { CommonResponseInterceptor } from '@common/interceptors';
import winstonLogger from '@common/logger/winston.logger';
import setupSwagger from '@config/swagger.config';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidUnknownValues: true
        })
    );
    app.useGlobalInterceptors(new CommonResponseInterceptor());
    app.useLogger(winstonLogger);
    setupSwagger(app);

    await app.listen(3300);
}
bootstrap();
