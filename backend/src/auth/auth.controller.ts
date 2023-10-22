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

// signup, signin시 응답데이터 포맷 (password 가리기)
// signout시 응답데이터 제거
// 응답 데이터 일관되도록 포맷

@Controller('auth')
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
}
