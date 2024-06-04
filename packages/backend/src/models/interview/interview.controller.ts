import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { Request as Req } from 'express';
import { AccessTokenGuard } from '@auth/guards/access-token.guard';
import { CreateInterviewDto } from '@models/interview/dto/create-interview-dto';
import { InterviewService } from '@models/interview/interview.service';

@Controller('interview')
@UseGuards(AccessTokenGuard)
export class InterviewController {
    constructor(private interviewService: InterviewService) {}

    @Post('/create')
    async create(@Request() _req: Req, @Body() interviewDto: CreateInterviewDto) {
        return this.interviewService.create(interviewDto);
    }

    // @Get()
    // async findAll(): Promise<string> {
    //     return `Hello World Interview`;
    // }

    // @Get()
    // async getById(): Promise<string> {
    //     return `Hello World Interview`;
    // }

    // @Patch()
    // async update(): Promise<string> {
    //     return `Hello World Interview`;
    // }

    // @Delete()
    // async deleteById(): Promise<string> {
    //     return `Hello World Interview`;
    // }
}
