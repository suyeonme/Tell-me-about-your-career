import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsPhoneNumber,
    IsNotEmpty,
    MinLength,
    Matches,
    IsOptional
} from 'class-validator';

export class SignupUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'Email' })
    email: string;

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
            message:
                'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
        }
    )
    @ApiProperty({ description: 'Password' })
    password: string;

    @IsString()
    @MinLength(3)
    @ApiProperty({ description: 'Username' })
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Job' })
    job: string;

    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Refresh Token' })
    refreshToken?: string;
}
