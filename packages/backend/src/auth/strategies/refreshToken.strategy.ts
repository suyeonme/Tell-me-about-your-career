import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh'
) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true
        });
    }

    validate(req: Request, payload) {
        const refreshToken = req
            .get('Authorization')
            .replace('Bearer', '')
            .trim();
        return { ...payload, refreshToken };
    }
}
