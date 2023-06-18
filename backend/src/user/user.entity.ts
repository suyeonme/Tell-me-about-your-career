import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { UserRole } from './user.type';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'string',
        unique: true
    })
    email: string;

    @Column('string')
    password: string;

    @Column('string')
    username: string;

    @Column('string')
    job: string;

    @Column('string')
    phone: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    // createdInterviews: InterviewEntity[];
    // favoriteInterviews: InterviewEntity[];
}
