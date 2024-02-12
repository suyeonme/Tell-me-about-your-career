import { User } from '@models/user/user.entity';

export type UserResponse = User & UserTokens;

export interface UserTokens {
    refreshToken: string;
    accessToken: string;
}
