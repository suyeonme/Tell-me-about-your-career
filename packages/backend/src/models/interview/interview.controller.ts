import {
    Controller,
    Post,
    Request,
    UseGuards,
    Body,
    Get,
    Param,
    Delete,
    Query,
    Patch,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { AccessTokenGuard } from '@auth/guards/access-token.guard';
import { CreateInterviewDto, DeleteInterviewDto, UpdateInterviewDto } from '@models/interview/dto';
import { InterviewService } from '@models/interview/interview.service';
import type { JobInterview } from '@models/interview/entity/interview.entity';

@Controller('interview')
@UseGuards(AccessTokenGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class InterviewController {
    constructor(private readonly interviewService: InterviewService) {}

    @Post('/create')
    async create(
        @Request() _req: Req,
        @Body() interviewDto: CreateInterviewDto,
    ): Promise<JobInterview> {
        return this.interviewService.create(interviewDto);
    }

    @Get('/all')
    async findAll(): Promise<Array<JobInterview>> {
        return this.interviewService.findAll();
    }

    @Get(':id')
    async getByInterviewId(@Param('id') id: string) {
        return this.interviewService.getByInterviewId(Number(id));
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateInterviewDto: UpdateInterviewDto) {
        return this.interviewService.update(Number(id), updateInterviewDto);
    }

    @Delete('/delete')
    deleteByInterviewId(@Query() query: DeleteInterviewDto) {
        return this.interviewService.remove(Number(query.id));
    }
}
