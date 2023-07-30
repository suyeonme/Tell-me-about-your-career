import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';

import { UserService } from '@models/user/user.service';
import { User } from '@models/user/user.entity';
import { SignupUserDto } from '@models/user/dto/signup-user.dto';
import { SigninUserDto } from '@models/user/dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}

    async signup(signupUserDto: SignupUserDto): Promise<User> {
        const isUserExist = await this.usersService.isUserExist(
            signupUserDto.email
        );
        if (isUserExist) {
            throw new BadRequestException('email is use');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = await this.hashPassword(signupUserDto.password, salt);
        const hashedPassword = `${salt}.${hash.toString('hex')}`;

        const createdUser = await this.usersService.create({
            ...signupUserDto,
            password: hashedPassword
        });
        return createdUser;
    }

    async signin(signinDto: SigninUserDto): Promise<User> {
        const { email, password } = signinDto;
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new NotFoundException('user not found');
        }

        const [salt, storedHash] = user.password.split('.');
        const hash = await this.hashPassword(password, salt);

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad password');
        }
        return user;
    }

    async hashPassword(password: string, salt: string): Promise<Buffer> {
        return (await scrypt(password, salt, 32)) as Buffer;
    }
}
