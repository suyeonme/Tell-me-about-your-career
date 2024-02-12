import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    MinLength,
    Matches,
    IsOptional,
    ValidateIf,
    IsPhoneNumber,
    IsEmail
} from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'Email' })
    email?: string;

    @IsOptional()
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
    password?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @ApiProperty({ description: 'Username' })
    username?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Job' })
    job?: string;

    @IsOptional()
    @IsPhoneNumber()
    @ApiProperty({ description: 'Phone' })
    phone?: string;

    @IsOptional()
    @IsString()
    @ValidateIf((_, value) => value !== null)
    @ApiProperty({ description: 'Access Token' })
    accessToken?: string;

    @IsOptional()
    @IsString()
    @ValidateIf((_, value) => value !== null)
    @ApiProperty({ description: 'Refresh Token' })
    refreshToken?: string;
}
