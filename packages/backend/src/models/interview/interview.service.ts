import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '@models/user/user.service';
import type { CreateInterviewDto } from '@models/interview/dto/create-interview-dto';
import { JobInterview } from './entity/interview.entity';

@Injectable()
export class InterviewService {
    private readonly logger = new Logger(InterviewService.name);

    constructor(
        private usersService: UserService,
        @InjectRepository(JobInterview)
        private jobInterviewRepository: Repository<JobInterview>,
    ) {}

    async create(createInterviewDto: CreateInterviewDto) {
        const user = await this.usersService.findOneById(createInterviewDto.userId);

        if (!user) {
            this.logger.error(`User is not found: userId=${createInterviewDto.userId}`);
            throw new NotFoundException(`${createInterviewDto.userId} is not found.`);
        }

        const jobInterview = this.jobInterviewRepository.create({
            ...createInterviewDto,
            author: user,
        });

        return this.jobInterviewRepository.save(jobInterview);
    }
}
