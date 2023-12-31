import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
    Development = 'development',
    Production = 'production'
}

class EnvironmentVariables {
    /** JWT  */
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsString()
    JWT_SECRET_KEY: string;

    @IsString()
    JWT_ACCESS_SECRET: string;

    @IsString()
    JWT_REFRESH_SECRET: string;

    @IsString()
    JWT_ACCESS_EXPIRE_TIME: string;

    @IsString()
    JWT_REFRESH_EXPIRE_TIME: string;

    /** @nestjs/throttler */
    @IsNumber()
    TIME_TO_LIVE_MILLISEC: number;

    @IsNumber()
    LIMIT_REQUEST_TIME_TO_LIVE: number;

    /** Redis  */
    @IsNumber()
    REDIS_PORT: number;

    @IsString()
    REDIS_HOST: string;
}

export const validate = (
    config: Record<string, unknown>
): EnvironmentVariables => {
    const validatedConfig = plainToClass(EnvironmentVariables, config, {
        enableImplicitConversion: true
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
};
