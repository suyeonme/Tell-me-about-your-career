import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InterviewModule } from './interview/interview.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'development.db',
            entities: [],
            synchronize: true
        }),
        InterviewModule,
        UserModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
