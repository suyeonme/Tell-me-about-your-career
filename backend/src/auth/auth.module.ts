import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { MailModule } from '@mail/mail.module';
import { UserModule } from '../models/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { MailService } from '@mail/mail.service';

@Module({
    imports: [
        MailModule,
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                global: true,
                secret: config.get<string>('JWT_SECRET_KEY'),
                signOptions: { expiresIn: '60s' }
            })
        })
    ],
    providers: [
        AuthService,
        MailService,
        LocalStrategy,
        AccessTokenStrategy,
        RefreshTokenStrategy
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
