import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class UserResponseDto extends UserDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Access Token' })
    accessToken: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Refresh Token' })
    refreshToken: string;
}
