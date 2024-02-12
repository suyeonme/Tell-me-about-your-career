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
import {
    ApiTags,
    ApiOperation,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse,
    ApiOkResponse,
    ApiForbiddenResponse,
    ApiBearerAuth,
    ApiBody
} from '@nestjs/swagger';

import { AuthService } from '@/auth/auth.service';
import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { AccessTokenGuard } from '@auth/guards/access-token.guard';
import {
    SignupUserDto,
    SigninUserDto,
    RefreshTokenDto,
    UserResponseDto
} from '@models/user/dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { User } from '@models/user/user.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Authentication API')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @ApiOperation({ summary: 'Signup', description: 'Create a user.' })
    @ApiBody({ type: SignupUserDto })
    @ApiCreatedResponse({
        description: 'Create a user successfully',
        type: UserResponseDto
    })
    @ApiBadRequestResponse({ description: 'Email is in use.' })
    async signup(@Body() signupUserDto: SignupUserDto) {
        return this.authService.signup(signupUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    @ApiOperation({ summary: 'Signin', description: 'Siginin' })
    @ApiBody({ type: SigninUserDto })
    @ApiOkResponse({
        description: 'Signin successfully',
        type: UserResponseDto
    })
    @ApiUnauthorizedResponse({ description: 'Invalid Credential' })
    @ApiNotFoundResponse({
        description: 'Signin is failed. User is not found.'
    })
    async login(@Request() req, @Body() signinUserDto: SigninUserDto) {
        return this.authService.signin(signinUserDto);
    }

    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @Get('/signout')
    @ApiOkResponse({ description: 'Signout successfully.', type: User })
    @ApiUnauthorizedResponse({ description: 'Invalid Credential' })
    async signout(@Request() req) {
        return this.authService.signout(req.user['sub']);
    }

    @ApiBearerAuth()
    @UseGuards(AccessTokenGuard)
    @Get('/profile')
    @ApiOkResponse({
        description: "Get a user's profile.",
        type: UserResponseDto
    })
    @ApiUnauthorizedResponse({ description: 'Invalid Credential' })
    getProfile(@Request() req) {
        return req.user;
    }

    @ApiBearerAuth()
    @UseGuards(RefreshTokenGuard)
    @Get('/refresh')
    @ApiUnauthorizedResponse({ description: 'Invalid Credential' })
    @ApiForbiddenResponse({ description: 'Access Denied' })
    @ApiOkResponse({ description: 'Refresh a token.', type: RefreshTokenDto })
    refreshTokens(@Request() req) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
