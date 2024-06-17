import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { CommonResponseInterceptor } from '@common/interceptors';
import winstonLogger from '@common/logger/winston.logger';
import { AppModule } from './app.module';

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule);

    app.useGlobalInterceptors(new CommonResponseInterceptor());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidUnknownValues: true,
        }),
    );

    app.useLogger(winstonLogger);
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CORS_ORIGIN ? [process.env.CORS_ORIGIN] : [],
        credentials: true,
        allowedHeaders: 'Content-Type, Accept',
    });
    await app.listen(3300);
};
bootstrap();
