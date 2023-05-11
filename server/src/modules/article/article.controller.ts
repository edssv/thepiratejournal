import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-Article.dto';
import { UpdateArticleDto } from './dto/update-Article.dto';

@Controller('Article')
export class ArticleController {
  constructor(private readonly ArticleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createArticleDto: CreateArticleDto) {
    // return this.ArticleService.create(req.user, createArticleDto);
  }

  @Get()
  findAll() {
    return this.ArticleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ArticleService.findOne(+id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':id')
  // update(@Request() req, @Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
  //   return this.ArticleService.update(+id, req.user.id, updateArticleDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.ArticleService.remove(+id, req.user.id);
  }
}
