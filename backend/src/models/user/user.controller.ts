import { Body, Controller, Post } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/signup')
    signup(@Body() signupUserDto: SignupUserDto) {
        return this.userService.signup(signupUserDto);
    }
}
