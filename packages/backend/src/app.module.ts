import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import {
    Resolvable,
    ThrottlerGuard,
    ThrottlerModule,
    ThrottlerModuleOptions
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
            useFactory: (
                configService: ConfigService
            ): Promise<ThrottlerModuleOptions> | ThrottlerModuleOptions => {
                const config: ConfigType<typeof appConfig> | undefined =
                    configService.get('app');
                if (!config) {
                    throw new Error('{app} configuration is not defined');
                }
                return {
                    throttlers: [
                        {
                            ttl: config.throttle
                                .timeToLiveMilliSec as Resolvable<number>,
                            limit: config.throttle
                                .limitRequestTimeToLive as Resolvable<number>
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
