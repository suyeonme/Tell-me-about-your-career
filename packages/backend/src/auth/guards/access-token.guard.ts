import {
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
    // 커스텀 인증 로직
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    // AuthGuard로부터 인증 과정의 결과를 처리
    handleRequest<T>(
        error: Error | null,
        user: T | false,
        info: { message?: string }
    ) {
        if (error) {
            throw new Error(error.message);
        } else if (!user) {
            if (info?.message) {
                throw new UnauthorizedException(info.message);
            } else {
                throw new UnauthorizedException();
            }
        } else {
            return user;
        }
    }
}
