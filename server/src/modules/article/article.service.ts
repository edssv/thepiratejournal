import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { SearchArticleDto } from './dto/search-article.dto';
import { Article } from './entities/article.entity';
import { DraftService } from '../draft/draft.service';
import { UpdateArticleInput } from './inputs/update-article.input';
import { CreateArticleInput } from './inputs/create-article.input';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private repository: Repository<Article>,
    private readonly draftService: DraftService
  ) {}

  create(userId: number, createArticleInput: CreateArticleInput) {
    const article = this.repository.save({
      user: { id: userId },
      title: createArticleInput.title,
      searchTitle: createArticleInput.title.toLowerCase(),
      description: createArticleInput.description,
      cover: createArticleInput.cover,
      body: createArticleInput.body,
      tags: createArticleInput.tags,
      category: createArticleInput.category,
      readingTime: createArticleInput.readingTime,
    });

    if (createArticleInput.draftId) {
      this.draftService.remove(createArticleInput.draftId);
    }

    return article;
  }

  findAll() {
    return this.repository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    return this.repository.findOne({ where: { id }, relations: ['user'] });
  }

  async findOneById(id: number) {
    await this.repository.increment({ id }, 'viewsCount', 1);

    const find = await this.repository
      .createQueryBuilder('articles')
      .where({ id })
      .leftJoinAndSelect('articles.likes', 'likes')
      .leftJoinAndSelect('articles.user', 'user')
      .getOne()
      .then((a) => ({ ...a, likesCount: a.likes.length }));

    if (!find) throw new NotFoundException('Статья не найдена');

    return find;
  }

  async update(userId: number, updateArticleInput: UpdateArticleInput) {
    const { id, ...articleData } = updateArticleInput;

    const find = await this.repository.findOne({ where: { id }, relations: ['user'] });

    if (!find) throw new NotFoundException('Статья не найдена');

    if (userId !== find.user.id) throw new ForbiddenException('Статья принадлежит другому пользователю.');

    this.repository.update(id, {
      title: articleData.title,
      description: articleData.description,
      cover: articleData.cover,
      body: articleData.body,
      tags: articleData.tags,
      category: articleData.category,
      readingTime: articleData.readingTime,
      searchTitle: articleData.title.toLowerCase(),
    });

    return this.repository.findOne({ where: { id } });
  }

  async remove(userId: number, id: number) {
    const find = await this.repository.findOne({ where: { id } });

    if (!find) throw new NotFoundException('Статья не найдена');

    if (userId !== find.user.id) throw new ForbiddenException('Статья принадлежит другому пользователю.');

    return this.repository.softDelete(id);
  }

  async search(dto: SearchArticleDto) {
    const qb = this.repository.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.user', 'users');
    if (dto.search) qb.andWhere('title LIKE :title', { title: dto.search });
    if (dto.body) qb.andWhere('body LIKE :body', { body: dto.body });
    if (dto.tag) qb.andWhere('tag LIKE :tag', { tag: dto.tag });

    if (dto.sort === 'recent') qb.orderBy('created_at', 'DESC');
    if (dto.sort === 'appreciations') qb.orderBy('likes_count', 'DESC');
    if (dto.sort === 'views' || dto.sort === undefined) qb.orderBy('views_count', 'DESC');

    const [articles, total] = await qb.getManyAndCount();

    return { articles, total };
  }

  async findSixMostPopular() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('views_count', 'DESC');
    qb.limit(6);

    return await qb.getMany();
  }

  async findNewest() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('created_at', 'DESC');
    qb.limit(9);

    return qb.getMany();
  }

  async findAuthorChoice() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('views_count', 'DESC');
    qb.limit(6);

    return await qb.getMany();
  }

  async findBestOfWeek() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('views_count', 'DESC');
    qb.limit(6);

    return qb.getMany();
  }

  async findNext(id: number) {
    return this.repository.find({ where: { id: Not(id) }, take: 3 });
  }

  async findLastTags() {
    const array = await this.repository.find({ select: ['tags'], take: 8 });
    return array
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 8);
  }
}
