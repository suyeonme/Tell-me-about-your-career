import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
    @IsString()
    @ApiProperty({ description: 'Refresh Token' })
    refreshToken: string;

    @IsString()
    @ApiProperty({ description: 'Access Token' })
    accessToken: string;
}
