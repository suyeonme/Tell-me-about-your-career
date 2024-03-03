import { Module } from '@nestjs/common';
import { JobInterviewController } from './job-interview.controller';
import { InterviewService } from './job-interview.service';

@Module({
    controllers: [JobInterviewController],
    providers: [InterviewService]
})
export class InterviewModule {}
