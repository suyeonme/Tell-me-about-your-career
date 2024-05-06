import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { SignupUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(signupUserDto: SignupUserDto): Promise<User> {
        const user = this.userRepository.create(signupUserDto);
        return this.userRepository.save(user);
    }

    async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOneById(userId);
        if (user === null) {
            this.logger.error(
                `Fail to update a user. User is null: userId=${userId}&updateUserDto=${JSON.stringify(
                    updateUserDto,
                )}`,
            );
            throw new HttpException('User with this id does not exist.', HttpStatus.NOT_FOUND);
        }
        return this.userRepository.save({ ...user, ...updateUserDto });
    }

    async remove(userId: number): Promise<User | null> {
        const user = await this.findOneById(userId);
        if (user === null) {
            this.logger.error(`Fail to remove a user. User is null: userId=${userId}}`);
            throw new HttpException('User with this id does not exist.', HttpStatus.NOT_FOUND);
        }
        return this.userRepository.remove(user);
    }

    // async findAll(): Promise<Array<User>> {
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
}
