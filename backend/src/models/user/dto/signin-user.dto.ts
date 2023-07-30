import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength,
    Matches
} from 'class-validator';

export class SigninUserDto {
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
}
