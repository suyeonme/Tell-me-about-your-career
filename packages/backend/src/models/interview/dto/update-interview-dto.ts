import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateInterviewDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    introduction?: string;

    @IsString()
    @IsOptional()
    reason?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    whatItry?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    prosAndCons?: string;
}
