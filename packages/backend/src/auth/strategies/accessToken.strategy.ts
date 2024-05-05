import appConfig from '@config/app.config';
import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(readonly configService: ConfigService) {
        const config: ConfigType<typeof appConfig> | undefined =
            configService.get('app');

        if (!config) {
            throw new Error('{app} configuration is not defined');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.jwt.secretKey
        });
    }

    validate(payload: {
        sub: string;
        username: string;
        iat: number; // issuedAt, 토큰 발급 시간
        exp: number; // expiredAt, 토큰 만료 시간
    }) {
        return { id: payload.sub, username: payload.username };
    }
}
