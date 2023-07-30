import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

/**
 * @description Accept only class (typescript)
 */
interface ClassConstructor {
    new (...args: any[]): {};
}

/**
 * @Decorator
 * @description Convert entity to a plain javascript object
 */
export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(
        context: ExecutionContext, // before request
        handler: CallHandler // before response
    ): Observable<any> | Promise<Observable<any>> {
        return handler.handle().pipe(
            map((data: any) => {
                // convert entity to a plain javascript object
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true // exclude any properties that are not defined in the DTO
                });
            })
        );
    }
}
