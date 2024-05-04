import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';

interface JwtPayload {
    id: string;
    email: string;
    refreshToken: string;
}

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

    validate(req: Request, payload: JwtPayload) {
        const authorizationHeader = req.get('Authorization');
        if (!authorizationHeader) {
            throw new UnauthorizedException('Missing authorization header');
        }
        const refreshToken = authorizationHeader.replace('Bearer', '').trim();
        return { ...payload, refreshToken };
    }
}
