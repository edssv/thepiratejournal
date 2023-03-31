import { Controller, Get, Post, Body, Patch, Param, Request, Delete, Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { SearchArticleDto } from './dto/search-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req, @Body() createArticleDto: CreateArticleDto) {
        return this.articleService.create(req.user.id, createArticleDto);
    }

    @Get()
    findAll() {
        return this.articleService.findAll();
    }

    @Get('search')
    search(@Query() searchArticleDto: SearchArticleDto) {
        return this.articleService.search(searchArticleDto);
    }

    @Get('popular')
    findPopular() {
        return this.articleService.findPopular();
    }

    @Get('newest')
    findNewest() {
        return this.articleService.findNewest();
    }

    @Get('week')
    findBestOfWeek() {
        return this.articleService.findBestOfWeek();
    }

    @Get('tags')
    findLastTags() {
        return this.articleService.findLastTags();
    }

    @Get(':id/next')
    findNext(@Param('id') id: string) {
        return this.articleService.findNext(+id);
    }

    @Get(':id')
    findOneById(@Param('id') id: string) {
        return this.articleService.findOneById(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Request() req, @Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
        return this.articleService.update(+id, req.user.id, updateArticleDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Request() req, @Param('id') id: string) {
        return this.articleService.remove(req.user.id, +id);
    }
}
