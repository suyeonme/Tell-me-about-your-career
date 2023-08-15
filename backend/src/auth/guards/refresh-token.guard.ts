import {
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * @summary This guard will be used for the route that refreshes the access token.
 */
@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
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
