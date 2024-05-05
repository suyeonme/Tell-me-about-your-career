import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    UseInterceptors,
    ClassSerializerInterceptor
} from '@nestjs/common';

import type { Request as Req } from 'express';
import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { AccessTokenGuard } from '@auth/guards/access-token.guard';
import { SignupUserDto, SigninUserDto } from '@models/user/dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signup(@Body() signupUserDto: SignupUserDto) {
        return this.authService.signup(signupUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async login(@Request() _req: Req, @Body() signinUserDto: SigninUserDto) {
        return this.authService.signin(signinUserDto);
    }

    @UseGuards(AccessTokenGuard)
    @Get('/signout')
    async signout(@Request() req: Req) {
        const user = req.user as { sub: number };
        return this.authService.signout(user.sub);
    }

    @UseGuards(AccessTokenGuard)
    @Get('/profile')
    getProfile(@Request() req: Req) {
        return req.user;
    }

    @UseGuards(RefreshTokenGuard)
    @Get('/refresh')
    refreshTokens(@Request() req: Req) {
        const user = req.user as { sub: number; refreshToken: string };
        const userId = user['sub'];
        const refreshToken = user['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
