import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Role } from './user.type';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'id' })
    id: number;

    @Column()
    @ApiProperty({ description: 'Email' })
    email: string;

    @Column()
    @Exclude()
    @ApiProperty({ description: 'Password' })
    password: string;

    @Column()
    @ApiProperty({ description: 'Username' })
    username: string;

    @Column()
    @ApiProperty({ description: 'Job' })
    job: string;

    @Column()
    @ApiProperty({ description: 'Phone number' })
    phone: string;

    @Column({
        default: Role.User
    })
    @ApiProperty({ description: 'Authorized Role' })
    role: Role;

    @Column({ nullable: true })
    @ApiProperty({ description: 'Refresh Token' })
    refreshToken: string | null;
}
