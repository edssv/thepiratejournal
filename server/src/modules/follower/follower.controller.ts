import { Controller, Post, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FollowerService } from './follower.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users/:id/followers')
export class FollowerController {
    constructor(private readonly followerService: FollowerService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Param('id') followingToId: string) {
        return this.followerService.create(+followingToId, +req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    remove(@Request() req, @Param('id') followingToId: string) {
        return this.followerService.remove(+followingToId, +req.user.id);
    }
}
