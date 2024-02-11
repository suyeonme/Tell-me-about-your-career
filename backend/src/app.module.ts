import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import {
    ThrottlerGuard,
    ThrottlerModule,
    ThrottlerModuleOptions,
    ThrottlerOptions
} from '@nestjs/throttler';

import appConfig from '@config/app.config';
import dbConfig from '@config/db.config';
import { InterviewModule } from './models/interview/interview.module';
import { UserModule } from './models/user/user.module';
import { User } from './models/user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
            load: [appConfig, dbConfig]
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: `${process.env.NODE_ENV}.db`,
            entities: [User],
            synchronize: true
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const config: ConfigType<typeof appConfig> =
                    configService.get('app');
                return {
                    throttlers: [
                        {
                            ttl: config.throttle.timeToLiveMilliSec,
                            limit: config.throttle.limitRequestTimeToLive
                        }
                    ]
                };
            }
        }),
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
