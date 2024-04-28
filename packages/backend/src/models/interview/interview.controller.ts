import { Controller, Get } from '@nestjs/common';

@Controller('interview')
export class InterviewController {
    @Get()
    getInterview(): string {
        return `Hello World Interview`;
    }
}
