import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '@models/user/user.entity';

@Entity()
export class JobInterview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    /** Introduction yourself */
    introduction: string;

    @Column('text')
    /** Why do you choose this job */
    reason: string;

    @Column('text')
    /** What did you try to get this job */
    whatItry: string;

    @Column('text')
    /** pros and cons of the job */
    prosAndCons: string;

    @ManyToOne(() => User, (user) => user.posts)
    author: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
