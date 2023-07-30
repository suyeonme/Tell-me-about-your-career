import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { SignupUserDto, SigninUserDto } from '@models/user/dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signup(@Body() signupUserDto: SignupUserDto) {
        const user = await this.authService.signup(signupUserDto);
        return user;
    }

    @Post('/signin')
    signin(@Body() signinUserDto: SigninUserDto) {
        const user = this.authService.signin(signinUserDto);
        return user;
    }
}
