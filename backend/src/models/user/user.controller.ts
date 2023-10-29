import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { AccessTokenGuard } from '@auth/guards/access-token.guard';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async findAll() {
        const users = await this.userService.findAll();
        const result = [...users];
        result.forEach((user) => {
            delete user.refreshToken;
        });
        return result;
    }

    @Get(':id')
    @UseGuards(AccessTokenGuard)
    async findOneById(@Param('id') id: string) {
        const user = await this.userService.findOneById(Number(id));
        if (!user) {
            throw new HttpException(
                'User with this id does not exist.',
                HttpStatus.NOT_FOUND
            );
        }
        return user;
    }

    @Patch(':id')
    @UseGuards(AccessTokenGuard)
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(Number(id), updateUserDto);
    }

    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    remove(@Param('id') id: string) {
        return this.userService.remove(Number(id));
    }
}
