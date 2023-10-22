import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SignupUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async create(signupUserDto: SignupUserDto): Promise<User> {
        const user = this.userRepository.create(signupUserDto);
        return this.userRepository.save(user);
    }

    async findOneByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ email });

        // if (!user) {
        //     throw new HttpException(
        //         'User with this email does not exist.',
        //         HttpStatus.NOT_FOUND
        //     );
        // }

        return user;
    }

    async findOneById(userId: number): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ id: userId });

        // if (!user) {
        //     throw new HttpException(
        //         'User with this id does not exist.',
        //         HttpStatus.NOT_FOUND
        //     );
        // }

        return user;
    }

    async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOneById(userId);
        return this.userRepository.save({ ...user, ...updateUserDto });
    }

    async isUserExist(email: string): Promise<boolean> {
        const user = await this.findOneByEmail(email);
        return user ? true : false;
    }

    async remove(userId: number) {
        const user = await this.findOneById(userId);

        if (!user) {
            throw new HttpException(
                'User with this id does not exist.',
                HttpStatus.NOT_FOUND
            );
        }

        return this.userRepository.remove(user);
    }
}
