import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    Get
} from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from '@/auth/local-auth.guard';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
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

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
