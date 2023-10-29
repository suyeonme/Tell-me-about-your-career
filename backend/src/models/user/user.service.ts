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
        this.userRepository.save(user);
        return user;
    }

    async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOneById(userId);
        if (!this.isUserExist(userId)) {
            throw new HttpException(
                'User with this id does not exist.',
                HttpStatus.NOT_FOUND
            );
        }
        this.userRepository.save({ ...user, ...updateUserDto });
        return user;
    }

    async remove(userId: number): Promise<User | null> {
        const user = await this.findOneById(userId);
        if (!this.isUserExist(userId)) {
            throw new HttpException(
                'User with this id does not exist.',
                HttpStatus.NOT_FOUND
            );
        }
        this.userRepository.remove(user);
        return user;
    }

    async findAll(): Promise<Array<User>> {
        const users = await this.userRepository.find();
        return users;
    }

    async findOneByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ email });
        return user;
    }

    async findOneById(userId: number): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ id: userId });
        return user;
    }

    async isEmailExist(email: string): Promise<boolean> {
        const user = await this.findOneByEmail(email);
        return user ? true : false;
    }

    async isUserExist(userId: number): Promise<boolean> {
        const user = await this.findOneById(userId);
        return user ? true : false;
    }
}
