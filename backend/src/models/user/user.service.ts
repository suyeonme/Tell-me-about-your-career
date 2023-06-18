import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SignupUserDto } from './dto/signup-user.dto';
import { User } from './user.entity';

/**
 * @todo
 * - Authentication
 * - CRUD
 * - serialize response data
 */
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async signup(signupUserDto: SignupUserDto) {
        const isUserExist = await this.isUserExist(signupUserDto.email);
        if (isUserExist) {
            throw new BadRequestException('User already exist');
        }
        const user = this.userRepository.create(signupUserDto);
        return this.userRepository.save(user);
    }

    private async isUserExist(email: string): Promise<boolean> {
        const user = await this.findOneByEmail(email);
        return !!user;
    }

    async findOneByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ email });
        return user;
    }
}
