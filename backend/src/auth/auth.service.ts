import * as argon2 from 'argon2';
import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@models/user/user.service';
import { User } from '@models/user/user.entity';
import { SignupUserDto } from '@models/user/dto/signup-user.dto';
import { SigninUserDto } from '@models/user/dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async signup(signupUserDto: SignupUserDto): Promise<
        User & {
            refreshToken: string;
            accessToken: string;
        }
    > {
        const isEmailExist = await this.usersService.isEmailExist(
            signupUserDto.email
        );
        if (isEmailExist) {
            throw new BadRequestException('email is use');
        }

        const user = await this.usersService.create({
            ...signupUserDto,
            password: await this.hashData(signupUserDto.password)
        });
        const accessToken = await this.generateAccessToken(
            user.id,
            user.username
        );
        const refreshToken = await this.generateRefreshToken(
            user.id,
            user.username
        );
        await this.updateRefreshToken(user.id, refreshToken);
        return {
            ...user,
            refreshToken,
            accessToken
        };
    }

    async signin(signinDto: SigninUserDto): Promise<
        User & {
            refreshToken: string;
            accessToken: string;
        }
    > {
        const { email, password } = signinDto;
        const user = await this.validateUser(email, password);
        const accessToken = await this.generateAccessToken(
            user.id,
            user.username
        );
        const refreshToken = await this.generateRefreshToken(
            user.id,
            user.username
        );
        await this.updateRefreshToken(user.id, refreshToken);
        return {
            ...user,
            refreshToken,
            accessToken
        };
    }

    async signout(userId: number) {
        return this.usersService.update(userId, { refreshToken: null });
    }

    hashData(data: string): Promise<string> {
        return argon2.hash(data);
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new NotFoundException('user not found');
        }

        const passwordMatches = await argon2.verify(user.password, password);
        if (!passwordMatches) {
            throw new BadRequestException('Password is incorrect');
        }

        return user;
    }

    async generateAccessToken(
        userId: number,
        username: string
    ): Promise<string> {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                username
            },
            {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME
            }
        );
    }

    async updateRefreshToken(
        userId: number,
        refreshToken: string
    ): Promise<void> {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(userId, {
            refreshToken: String(hashedRefreshToken)
        });
    }

    async generateRefreshToken(
        userId: number,
        username: string
    ): Promise<string> {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                username
            },
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME
            }
        );
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.usersService.findOneById(userId);
        if (!user || !user.refreshToken) {
            throw new ForbiddenException('Access Denied');
        }

        const refreshTokenMatches = await argon2.verify(
            user.refreshToken,
            refreshToken
        );
        if (!refreshTokenMatches) {
            throw new ForbiddenException('Access Denied');
        }

        const refresh_token = await this.generateRefreshToken(
            user.id,
            user.username
        );
        const access_token = await this.generateAccessToken(
            user.id,
            user.username
        );
        await this.updateRefreshToken(user.id, refreshToken);
        return {
            refreshToken: refresh_token,
            accessToken: access_token
        };
    }
}
