import {
    IsString,
    IsNotEmpty,
    MinLength,
    Matches,
    IsOptional,
    ValidateIf
} from 'class-validator';

export class UpdateUserDto {
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

    @IsString()
    @ValidateIf((_, value) => value !== null)
    refreshToken: string;
}
