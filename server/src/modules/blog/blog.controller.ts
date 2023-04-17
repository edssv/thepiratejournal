import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createBlogDto: CreateBlogDto) {
    // return this.blogService.create(req.user, createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':id')
  // update(@Request() req, @Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
  //   return this.blogService.update(+id, req.user.id, updateBlogDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.blogService.remove(+id, req.user.id);
  }
}
