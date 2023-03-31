import { Controller, Post, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BookmarkService } from './bookmark.service';

@Controller('articles/:id/bookmarks')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarkService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Param('id') articleId: string) {
        return this.bookmarkService.create(+articleId, +req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    remove(@Request() req, @Param('id') articleId: string) {
        return this.bookmarkService.remove(+articleId, +req.user.id);
    }
}
