import { Test, TestingModule } from '@nestjs/testing';
import { JobInterviewController } from './job-interview.controller';

describe('JobInterviewController', () => {
    let controller: JobInterviewController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [JobInterviewController]
        }).compile();

        controller = module.get<JobInterviewController>(JobInterviewController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
