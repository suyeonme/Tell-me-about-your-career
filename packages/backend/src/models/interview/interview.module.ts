import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewController } from './interview.controller';
import { UserModule } from '@models/user/user.module';
import { InterviewService } from '@models/interview/interview.service';
import { JobInterview } from '@models/interview/entity/interview.entity';

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([JobInterview])],
    controllers: [InterviewController],
    providers: [InterviewService],
    exports: [InterviewService],
})
export class InterviewModule {}
