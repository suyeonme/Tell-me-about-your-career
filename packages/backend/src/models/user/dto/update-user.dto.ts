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
    password?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    username?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    job?: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsString()
    @ValidateIf((_, value) => value !== null)
    accessToken?: string;

    @IsOptional()
    @IsString()
    @ValidateIf((_, value) => value !== null)
    refreshToken?: string | null;
}
