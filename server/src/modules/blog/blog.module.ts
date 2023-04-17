import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from './entities/blog.entity';
import { BlogResolver } from './blog.resolver';
import { DraftModule } from '../draft/draft.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), DraftModule],
  controllers: [BlogController],
  providers: [BlogService, BlogResolver],
})
export class BlogModule {}
