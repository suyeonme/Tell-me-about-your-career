import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService, type ConfigType } from '@nestjs/config';
import {
    ThrottlerGuard,
    ThrottlerModule,
    type Resolvable,
    type ThrottlerModuleOptions,
} from '@nestjs/throttler';

import appConfig from '@config/app.config';
import dbConfig from '@config/db.config';
import { InterviewModule } from './models/interview/interview.module';
import { UserModule } from './models/user/user.module';
import { User } from './models/user/user.entity';
import { AuthModule } from './auth/auth.module';
import { JobInterview } from '@models/interview/entity/interview.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
            load: [appConfig, dbConfig],
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: `${process.env.NODE_ENV}.db`,
            entities: [User, JobInterview],
            synchronize: true, // use only dev mode
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (
                configService: ConfigService,
            ): Promise<ThrottlerModuleOptions> | ThrottlerModuleOptions => {
                const config: ConfigType<typeof appConfig> | undefined = configService.get('app');
                if (!config) {
                    throw new Error('{app} configuration is not defined');
                }
                return {
                    throttlers: [
                        {
                            ttl: config.throttle.timeToLiveMilliSec as Resolvable<number>,
                            limit: config.throttle.limitRequestTimeToLive as Resolvable<number>,
                        },
                    ],
                };
            },
        }),
        InterviewModule,
        UserModule,
        AuthModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
