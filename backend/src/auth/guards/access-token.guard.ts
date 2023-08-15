import {
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * @summary This guard will be used in protecting any protected route.
 */
@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Custom authentication logic
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // Throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
