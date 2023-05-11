import { Controller, Get, Body, Patch, Param, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

  @Get(':id/:articles')
  findOneWithArticles(
    @Param('id') id: string,
    @Param('articles') articles: string,
  ) {
    return this.userService.findOneWithArticles(+id, articles);
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
