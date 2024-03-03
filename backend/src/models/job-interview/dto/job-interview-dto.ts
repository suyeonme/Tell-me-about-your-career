import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsArray,
    ArrayMinSize,
    IsNumber
} from 'class-validator';

export class JobInterviewDto {
    @IsNumber()
    userId: number;

    @IsString()
    @IsNotEmpty()
    // @MaxLength()
    title: string;

    @IsString()
    @IsNotEmpty()
    // @MaxLength()
    /** 자기소개 */
    introduction: string;

    @IsString()
    @IsNotEmpty()
    // @MaxLength()
    /** 직업을 선택하게된 계기 */
    motivation: string;

    @IsString()
    @IsNotEmpty()
    // @MaxLength()
    /** 직업을 갖기위해 노력했던 점 */
    efforts: string;

    @IsString()
    @IsNotEmpty()
    // @MaxLength()
    description: string;

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    /** 직업 태그 */
    tags: Array<string>;
}
