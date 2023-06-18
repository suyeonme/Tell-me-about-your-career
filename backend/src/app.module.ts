import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InterviewModule } from './models/interview/interview.module';
import { UserModule } from './models/user/user.module';
import { User } from './models/user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'development.db',
            entities: [User],
            synchronize: true
        }),
        InterviewModule,
        UserModule,
        AuthModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        }
    ]
})
export class AppModule {}
