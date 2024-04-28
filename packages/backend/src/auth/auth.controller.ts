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
    async login(@Request() req, @Body() signinUserDto: SigninUserDto) {
        return this.authService.signin(signinUserDto);
    }

    @UseGuards(AccessTokenGuard)
    @Get('/signout')
    async signout(@Request() req) {
        return this.authService.signout(req.user['sub']);
    }

    @UseGuards(AccessTokenGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(RefreshTokenGuard)
    @Get('/refresh')
    refreshTokens(@Request() req) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
