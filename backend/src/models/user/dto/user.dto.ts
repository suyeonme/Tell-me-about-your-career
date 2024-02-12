import { Expose } from 'class-transformer';
import { Role } from '../user.type';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @Expose()
    @ApiProperty({ description: 'Id' })
    id: number;

    @Expose()
    @ApiProperty({ description: 'Email' })
    email: string;

    @Expose()
    @ApiProperty({ description: 'Username' })
    username: string;

    @Expose()
    @ApiProperty({ description: 'Job' })
    job: string;

    @Expose()
    @ApiProperty({ description: 'Phone' })
    phone: string;

    @Expose()
    @ApiProperty({ description: 'Role' })
    role: Role;
}
