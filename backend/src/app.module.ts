import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InterviewModule } from './interview/interview.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'development.db',
            entities: [UserEntity],
            synchronize: true
        }),
        InterviewModule,
        UserModule
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
