import {
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
    canActivate(context: ExecutionContext) {
        // Custom authentication logic
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
