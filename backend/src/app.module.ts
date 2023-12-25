import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { InterviewModule } from './models/interview/interview.module';
import { UserModule } from './models/user/user.module';

import { User } from './models/user/user.entity';
import { AuthModule } from './auth/auth.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: `${process.env.NODE_ENV}.db`,
            entities: [User],
            synchronize: true
        }),
        ThrottlerModule.forRoot([
            {
                ttl: Number(process.env.TIME_TO_LIVE),
                limit: Number(process.env.LIMIT_TIME_TO_LIVE)
            }
        ]),
        InterviewModule,
        UserModule,
        AuthModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}
