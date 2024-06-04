import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateInterviewDto {
    @IsNumberString()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    introduction: string;

    @IsString()
    reason: string;

    @IsString()
    @IsNotEmpty()
    whatItry: string;

    @IsString()
    @IsNotEmpty()
    prosAndCons: string;
}
