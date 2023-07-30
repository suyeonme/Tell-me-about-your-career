import { Expose } from 'class-transformer';
import { UserRole } from '../user.type';

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
    role: UserRole;
}
