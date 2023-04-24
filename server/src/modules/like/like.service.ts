import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleService } from 'src/modules/article/article.service';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private repository: Repository<Like>,
    private readonly articleService: ArticleService
  ) {}

  async create(articleId: number, userId: number) {
    const findLike = await this.repository.findOne({
      where: { article: { id: articleId }, user: { id: userId } },
    });
    if (findLike) throw new NotAcceptableException('Уже есть оценка.');

    const find = await this.articleService.findOne(articleId);
    if (!find) throw new NotFoundException('Статья не найдена');

    return this.repository.save({ article: { id: articleId }, user: { id: userId } });
  }

  async remove(articleId: number, userId: number) {
    const findLike = await this.repository.findOne({
      where: { article: { id: articleId }, user: { id: userId } },
    });
    if (!findLike) throw new NotAcceptableException('Оценки нет.');

    const find = await this.articleService.findOne(articleId);
    if (!find) throw new NotFoundException('Статья не найдена');

    return this.repository.delete({ article: { id: articleId }, user: { id: userId } });
  }
}
