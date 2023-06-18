import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isSuccessStatusCode, getStatusMessage } from '@utils';
import { HttpStatusCode, type StatusMessage } from '@types';

/**
 * @summary Interceptor for common response format
 */
@Injectable()
export class CommonResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const statusCode: HttpStatusCode = context
                    .switchToHttp()
                    .getResponse().statusCode;
                const message: StatusMessage = getStatusMessage(statusCode);
                return {
                    statusCode,
                    message,
                    data
                };
            })
        );
    }
}
