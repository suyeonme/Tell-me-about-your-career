import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteInterviewDto {
    @IsString()
    @IsNotEmpty()
    id: number;
}
