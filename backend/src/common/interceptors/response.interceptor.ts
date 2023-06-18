import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpStatus
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getStatusMessage } from '@common/helpers';
import { type StatusMessage } from '@common/interfaces';

/**
 * @summary Interceptor for common response format
 */
@Injectable()
export class CommonResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const statusCode: HttpStatus = context
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
