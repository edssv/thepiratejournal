import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { Bookmark } from './entities/bookmark.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from '../article/article.module';

@Module({
    imports: [TypeOrmModule.forFeature([Bookmark]), ArticleModule],
    controllers: [BookmarkController],
    providers: [BookmarkService],
})
export class BookmarkModule {}
