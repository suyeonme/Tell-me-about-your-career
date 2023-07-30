import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '../models/user/user.service';
import { User } from '../models/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService, UserService]
})
export class AuthModule {}
