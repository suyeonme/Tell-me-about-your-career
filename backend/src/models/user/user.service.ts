import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SignupUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    create(signupUserDto: SignupUserDto): Promise<User> {
        const user = this.userRepository.create(signupUserDto);
        return this.userRepository.save(user);
    }

    async findOneByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ email });
        return user;
    }

    async isUserExist(email: string): Promise<boolean> {
        const user = await this.findOneByEmail(email);
        return user ? true : false;
    }
}
