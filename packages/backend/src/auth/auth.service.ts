import * as argon2 from 'argon2';
import {
    BadRequestException,
    ForbiddenException,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { MailService } from '@mail/mail.service';
import { UserService } from '@models/user/user.service';
import type { SignupUserDto } from '@models/user/dto/signup-user.dto';
import type { SigninUserDto } from '@models/user/dto';
import type { User } from '@models/user/user.entity';
import appConfig from '@config/app.config';
import type { AuthResponse } from './auth.service.types';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private mailService: MailService,

        @Inject(appConfig.KEY)
        private config: ConfigType<typeof appConfig>,
    ) {}

    async signup(signupUserDto: SignupUserDto): Promise<AuthResponse> {
        const isEmailExist = await this.usersService.isEmailExist(signupUserDto.email);
        if (isEmailExist) {
            this.logger.error(
                `Failed to signup. Email is in use: email=${signupUserDto.email}&username=${signupUserDto.username}`,
            );
            throw new BadRequestException('Email is in use.');
        }

        const user = await this.usersService.create({
            ...signupUserDto,
            password: await this.hashData(signupUserDto.password),
        });

        const accessToken = await this.generateAccessToken(user.id, user.username);
        const refreshToken = await this.generateRefreshToken(user.id, user.username);
        await this.updateRefreshToken(user.id, refreshToken);

        this.mailService.sendSignUpCongratMail(signupUserDto.email);

        this.logger.log(
            `Signup successful: email=${signupUserDto.email}&username=${signupUserDto.username}`,
        );

        return Object.assign(user, { refreshToken, accessToken });
    }

    async signin(signinDto: SigninUserDto): Promise<{
        user: User;
        accessToken: string;
    }> {
        const user = await this.usersService.findOneByEmail(signinDto.email);

        if (!user) {
            this.logger.error(`Failed to signin. User is not found: email=${signinDto.email}`);
            throw new NotFoundException(`${signinDto.email} is not found.`);
        }

        const accessToken = await this.generateAccessToken(user.id, user.username);
        const refreshToken = await this.generateRefreshToken(user.id, user.username);
        await this.updateRefreshToken(user.id, refreshToken);
        this.logger.log(`Signin successful: email=${signinDto.email}`);
        return { user, accessToken };
    }

    async signout(userId: number) {
        this.logger.log(`Signout successful: userId=${userId}`);
        return this.usersService.update(userId, { refreshToken: null });
    }

    hashData(data: string): Promise<string> {
        return argon2.hash(data);
    }

    async validatePassword(hashedPassword: string, incomingPassword: string): Promise<boolean> {
        return await argon2.verify(hashedPassword, incomingPassword);
    }

    async generateAccessToken(userId: number, username: string): Promise<string> {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                username,
            },
            {
                secret: this.config.jwt.secretKey,
                expiresIn: this.config.jwt.accessExpireTime,
            },
        );
    }

    async updateRefreshToken(userId: number, refreshToken: string): Promise<void> {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(userId, {
            refreshToken: String(hashedRefreshToken),
        });
    }

    async generateRefreshToken(userId: number, username: string): Promise<string> {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                username,
            },
            {
                secret: this.config.jwt.refreshSecret,
                expiresIn: this.config.jwt.refreshExpireTime,
            },
        );
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.usersService.findOneById(userId);
        if (!user || !user.refreshToken) {
            this.logger.error(
                `Fail to refresh token. Token is not found.: userId=${userId}&refreshToken=${refreshToken}`,
            );
            throw new ForbiddenException('Access Denied');
        }

        const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
        if (!refreshTokenMatches) {
            this.logger.error(
                `Fail to refresh token. Token doesn't match: userRefreshToken=${user.refreshToken}&refreshToken=${refreshToken}`,
            );
            throw new ForbiddenException('Access Denied');
        }

        const updatedRefreshToken = await this.generateRefreshToken(user.id, user.username);
        const updatedAccessToken = await this.generateAccessToken(user.id, user.username);
        await this.updateRefreshToken(user.id, updatedRefreshToken);
        return {
            refreshToken: updatedRefreshToken,
            accessToken: updatedAccessToken,
        };
    }
}
