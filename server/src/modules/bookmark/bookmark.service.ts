import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleService } from '../article/article.service';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarkService {
    constructor(
        @InjectRepository(Bookmark)
        private repository: Repository<Bookmark>,
        private readonly articleService: ArticleService
    ) {}

    async create(articleId: number, userId: number) {
        const findBookmark = await this.repository.findOne({
            where: { article: { id: articleId }, user: { id: userId } },
        });
        if (findBookmark) throw new NotAcceptableException('Закладка уже есть.');

        const find = await this.articleService.findOne(articleId);
        if (!find) throw new NotFoundException('Статья не найдена');

        return this.repository.save({ article: { id: articleId }, user: { id: userId } });
    }

    async remove(articleId: number, userId: number) {
        const findBookmark = await this.repository.findOne({
            where: { article: { id: articleId }, user: { id: userId } },
        });
        if (!findBookmark) throw new NotAcceptableException('Закладки нет.');

        const find = await this.articleService.findOne(articleId);
        if (!find) throw new NotFoundException('Статья не найдена');

        return this.repository.delete({ article: { id: articleId }, user: { id: userId } });
    }
}
