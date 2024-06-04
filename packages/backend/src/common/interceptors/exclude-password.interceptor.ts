import type { User } from '@models/user/user.entity';
import {
    type CallHandler,
    type ExecutionContext,
    type NestInterceptor,
    Injectable,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            map((data) => {
                if (Array.isArray(data)) {
                    return data.map(this.excludePassword);
                }
                return this.excludePassword(data);
            }),
        );
    }

    private excludePassword(user: User) {
        const cloned: Partial<User> = { ...user };
        if (cloned.password) {
            delete cloned.password;
        }
        return cloned as Omit<User, 'password'>;
    }
}
