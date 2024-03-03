import { Controller, Get } from '@nestjs/common';

// 인터뷰 생성
// 인터뷰 수정
// 인터뷰 삭제
// 전체 목록 가져오기 & 페이지네이션
// 필터걸어저 목록 가져오기

@Controller('interview')
export class JobInterviewController {
    @Get()
    create(): string {
        return `Create`;
    }

    update(): string {
        return `Update`;
    }

    delete(): string {
        return `Delete`;
    }

    getAllInterviews(): string {
        return `Delete`;
    }
}
