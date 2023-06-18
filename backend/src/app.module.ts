import { Module } from '@nestjs/common';
import { InterviewModule } from './interview/interview.module';

@Module({
  imports: [InterviewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
