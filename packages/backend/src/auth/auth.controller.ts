import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    UseInterceptors,
    ClassSerializerInterceptor,
    Res,
} from '@nestjs/common';

import { Request as Req, Response } from 'express';
import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { AccessTokenGuard } from '@auth/guards/access-token.guard';
import { SignupUserDto, SigninUserDto } from '@models/user/dto';
import type { User } from '@models/user/user.entity';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { REFRESH_TOKEN_COOKIE_MAX_AGE } from './auth.meta';

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
    async login(
        @Request() _req: Req,
        @Body() signinUserDto: SigninUserDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { user, accessToken } = await this.authService.signin(signinUserDto);

        res.cookie('refreshToken', user.refreshToken, {
            httpOnly: true,
            secure: true, // Ensure secure for HTTPS
            sameSite: 'strict', // Prevent CSRF attack
            maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
        });

        const copied: Omit<User, 'password' | 'refreshToken'> = { ...user };

        /**@description @Exclude() 항목이 인터셉터에서 제거되지않으므로 수동으로 제거  */
        if ('password' in copied && 'refreshToken' in copied) {
            delete copied.password;
            delete copied.refreshToken;
        }

        return { ...copied, accessToken };
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
    async refreshTokens(@Request() req: Req, @Res({ passthrough: true }) res: Response) {
        const user = req.user as { sub: number; refreshToken: string };
        const userId = user['sub'];
        const refreshToken = user['refreshToken'];
        const result = await this.authService.refreshTokens(userId, refreshToken);

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
        });

        return result.accessToken;
    }
}
