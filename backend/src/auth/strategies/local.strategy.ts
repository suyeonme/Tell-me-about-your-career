import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '@models/user/user.service';
import { User } from '@models/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
        private usersService: UserService
    ) {
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, password: string) {
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isValidPassword = await this.authService.validatePassword(
            user.password,
            password
        );

        if (user && !isValidPassword) {
            throw new BadRequestException('Password is incorrect');
        }

        return user;
    }
}
