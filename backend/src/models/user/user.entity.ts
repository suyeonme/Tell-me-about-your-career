import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '@common/enums/role.enum';
import { JobInterview } from '@models/job-interview/entity/job-interview.entity';

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
        default: Role.USER
    })
    role: Role;

    @Column({ nullable: true })
    refreshToken: string | null;

    @OneToMany(() => JobInterview, (jobInterview) => jobInterview.user)
    jobInterviews: Array<JobInterview>;
}
