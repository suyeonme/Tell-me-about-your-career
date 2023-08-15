import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@models/user/user.service';
import { User } from '@models/user/user.entity';
import { SignupUserDto } from '@models/user/dto/signup-user.dto';
import { SigninUserDto } from '@models/user/dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async signup(signupUserDto: SignupUserDto): Promise<User> {
        const isUserExist = await this.usersService.isUserExist(
            signupUserDto.email
        );
        if (isUserExist) {
            throw new BadRequestException('email is use');
        }

        const salt = this.generateSalt();
        const hash = await this.hashData(signupUserDto.password, salt);
        const hashedPassword = `${salt}.${hash.toString('hex')}`;

        const user = await this.usersService.create({
            ...signupUserDto,
            password: hashedPassword
        });

        return user;
    }

    async signin(
        signinDto: SigninUserDto
    ): Promise<{ access_token: string; refresh_token: string }> {
        const { email, password } = signinDto;
        const user = await this.validateUser(email, password);

        const { access_token, refresh_token } =
            await this.getAccessAndRefreshToken(user.id, user.username);

        await this.updateRefreshToken(user.id, refresh_token);

        return { access_token, refresh_token };
    }

    async signout(userId: number) {
        return this.usersService.update(userId, { refresh_token: null });
    }

    async hashData(data: string, salt: string): Promise<Buffer> {
        return (await scrypt(data, salt, 32)) as Buffer;
    }

    generateSalt(): string {
        return randomBytes(8).toString('hex');
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new NotFoundException('user not found');
        }

        const [salt, storedHash] = user.password.split('.');
        const hash = await this.hashData(password, salt);

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad password');
        }

        return user;
    }

    async getAccessAndRefreshToken(
        userId: number,
        username: string
    ): Promise<{ access_token: string; refresh_token: string }> {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET,
                    expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME
                }
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username
                },
                {
                    secret: process.env.JWT_REFRESH_SECRET,
                    expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME
                }
            )
        ]);

        return {
            access_token,
            refresh_token
        };
    }

    async updateRefreshToken(
        userId: number,
        refreshToken: string
    ): Promise<void> {
        const salt = this.generateSalt();
        const hashedRefreshToken = await this.hashData(refreshToken, salt);
        await this.usersService.update(userId, {
            refresh_token: hashedRefreshToken
        });
    }
}
