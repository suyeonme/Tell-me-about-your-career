import type { User } from '@models/user/user.entity';

export interface AuthResponse extends Omit<User, 'password'> {
    refreshToken: string;
    accessToken: string;
}
