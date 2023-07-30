import { Expose } from 'class-transformer';
import { Role } from '../user.type';

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

    @Expose()
    username: string;

    @Expose()
    job: string;

    @Expose()
    phone: string;

    @Expose()
    role: Role;
}
