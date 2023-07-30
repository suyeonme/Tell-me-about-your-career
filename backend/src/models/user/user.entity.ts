import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Role } from './user.type';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    username: string;

    @Column()
    job: string;

    @Column()
    phone: string;

    @Column({
        default: Role.User
    })
    role: Role;

    // createdInterviews: InterviewEntity[];
    // favoriteInterviews: InterviewEntity[];
}
