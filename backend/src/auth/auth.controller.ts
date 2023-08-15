import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    Get
} from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { AccessTokenGuard } from '@auth/guards/access-token.guard';
import { SignupUserDto, SigninUserDto } from '@models/user/dto';

// signout시 응답데이터 제거
// 응답 데이터 일관되도록 포맷

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signup(@Body() signupUserDto: SignupUserDto) {
        const user = await this.authService.signup(signupUserDto);
        return user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async login(@Request() req, @Body() signinUserDto: SigninUserDto) {
        return this.authService.signin(signinUserDto);
    }

    @UseGuards(AccessTokenGuard)
    @Get('/signout')
    async signout(@Request() req) {
        return this.authService.signout(req.user.id);
    }

    @UseGuards(AccessTokenGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
