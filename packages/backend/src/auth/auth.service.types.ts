import { User } from '@models/user/user.entity';

export interface AuthResponse extends User {
    refreshToken: string;
    accessToken: string;
}
