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
    password: string;

    @IsString()
    @MinLength(3)
    username: string;

    @IsString()
    @IsNotEmpty()
    job: string;

    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsOptional()
    refreshToken?: string;
}
