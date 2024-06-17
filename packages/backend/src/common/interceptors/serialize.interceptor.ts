import {
    UseInterceptors,
    type NestInterceptor,
    type ExecutionContext,
    type CallHandler,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
    new (...args: Array<unknown>): unknown;
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassConstructor) {}

    intercept(
        _context: ExecutionContext, // before request
        handler: CallHandler, // before response
    ): Observable<unknown> | Promise<Observable<unknown>> {
        return handler.handle().pipe(
            map((data: unknown) => {
                // entity를 자바스크립트 객체로 변환
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}

/**
 * @Decorator
 * @description Convert entity to a plain javascript object
 */
export const Serialize = (dto: ClassConstructor) => {
    return UseInterceptors(new SerializeInterceptor(dto));
};
