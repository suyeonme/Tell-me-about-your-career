import { Injectable, Logger, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '@models/user/user.service';
import type { CreateInterviewDto, UpdateInterviewDto } from '@models/interview/dto';
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

    async findAll(): Promise<Array<JobInterview>> {
        return this.jobInterviewRepository.find();
    }

    async getByInterviewId(interviewId: number): Promise<JobInterview | null> {
        const interview = await this.jobInterviewRepository.findOneBy({ id: interviewId });
        if (!interview) {
            throw new HttpException('Interview with this ID does not exist.', HttpStatus.NOT_FOUND);
        }
        return interview;
    }

    async remove(interviewId: number): Promise<JobInterview | null> {
        const candidate = await this.jobInterviewRepository.findOneBy({ id: interviewId });
        if (candidate === null) {
            this.logger.error(`Fail to delete an interview. interviewId=${interviewId}}`);
            throw new HttpException('Interview with this id does not exist.', HttpStatus.NOT_FOUND);
        }
        return this.jobInterviewRepository.remove(candidate);
    }

    async update(
        interviewId: number,
        updateInterviewDto: UpdateInterviewDto,
    ): Promise<JobInterview> {
        const candidate = await this.jobInterviewRepository.findOneBy({ id: interviewId });
        if (candidate === null) {
            this.logger.error(
                `Fail to update an interview. interviewId=${interviewId}&updateInterviewDto=${JSON.stringify(
                    updateInterviewDto,
                )}`,
            );
            throw new HttpException('Interview with this id does not exist.', HttpStatus.NOT_FOUND);
        }

        return this.jobInterviewRepository.save(Object.assign(candidate, updateInterviewDto));
    }
}
