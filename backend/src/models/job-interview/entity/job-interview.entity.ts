import { User } from '@models/user/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity()
export class JobInterview {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'text'
        // length:
    })
    title: string;

    @Column('text')
    introduction: string;

    @Column('text')
    motivation: string;

    @Column('text')
    efforts: string;

    @Column('text')
    description: string;

    @Column('simple-array')
    tags: Array<string>;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.jobInterviews)
    user: User;
}
