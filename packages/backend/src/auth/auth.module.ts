import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule, type ConfigType } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { MailService } from '@mail/mail.service';
import appConfig from '@config/app.config';
import { MailModule } from '@mail/mail.module';
import { UserModule } from '../models/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
    imports: [
        MailModule,
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule.forFeature(appConfig)],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const config: ConfigType<typeof appConfig> | undefined = configService.get('app');
                if (!config) {
                    throw new Error('{app} configuration is not defined');
                }
                return {
                    global: true,
                    secret: config.jwt.secretKey,
                    signOptions: { expiresIn: '60s' },
                };
            },
        }),
    ],
    providers: [AuthService, MailService, LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
