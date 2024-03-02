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
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { AccessTokenGuard } from '@auth/guards/access-token.guard';
import { Roles } from '@common/decorators/role.decorator';
import { Role } from '@common/enums/role.enum';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { RolesGuard } from '@auth/guards/roles.guard';

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
    @Roles(Role.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    remove(@Param('id') id: string) {
        return this.userService.remove(Number(id));
    }
}
