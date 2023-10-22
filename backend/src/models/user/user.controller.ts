import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
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

    @Get(':id')
    findOneById(@Param('id') id: string) {
        return this.userService.findOneById(Number(id));
    }

    @UseGuards(AccessTokenGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(Number(id), updateUserDto);
    }

    @UseGuards(AccessTokenGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(Number(id));
    }
}
