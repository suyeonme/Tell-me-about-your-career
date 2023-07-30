import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    UseInterceptors
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { UserService } from './user.service';
import { SignupUserDto, SigninUserDto, UserDto } from './dto';

// add user information to session

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(
        // private userService: UserService,
        private authService: AuthService
    ) {}

    @Post('/signup')
    async signup(@Body() signupUserDto: SignupUserDto) {
        const user = await this.authService.signup(signupUserDto);
        // session.userId = user.id;
        return user;
    }

    @Post('/signin')
    signin(@Body() signinUserDto: SigninUserDto) {
        const user = this.authService.signin(signinUserDto);
        // session.userId = user.id;
        return user;
    }
}
