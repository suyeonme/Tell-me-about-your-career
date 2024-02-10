import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { CommonResponseInterceptor } from '@common/interceptors';
import winstonLogger from '@common/logger/winston.logger';
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
    await app.listen(3300);
}
bootstrap();
