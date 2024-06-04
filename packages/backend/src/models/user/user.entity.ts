import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '@common/enums/role.enum';
import { JobInterview } from '@models/interview/entity/interview.entity';

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

    @Column({ default: Role.USER })
    role: Role;

    @Column({ type: 'varchar', nullable: true })
    refreshToken: string | null;

    @OneToMany(() => JobInterview, (post) => post.author)
    posts: Array<JobInterview>;
}
