import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(req.user.id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/followers')
    follow(@Request() req, @Param() id: number) {
        return this.userService.follow(id, req.user.id);
    }
}
