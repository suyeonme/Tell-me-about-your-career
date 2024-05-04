import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '@common/enums/role.enum';

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

    @Column({ type: 'varchar', nullable: true }) refreshToken: string | null;
}
