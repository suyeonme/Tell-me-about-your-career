import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { SignupUserDto, SigninUserDto } from '@models/user/dto';

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
}
