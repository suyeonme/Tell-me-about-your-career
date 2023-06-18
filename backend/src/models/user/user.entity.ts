import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { UserRole } from './user.type';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column()
    job: string;

    @Column()
    phone: string;

    @Column({
        default: UserRole.USER
    })
    role: UserRole;

    // createdInterviews: InterviewEntity[];
    // favoriteInterviews: InterviewEntity[];
}
