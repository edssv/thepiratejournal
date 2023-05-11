import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { DraftService } from '../draft/draft.service';
import { CreateArticleInput } from './inputs/create-Article.input';
import { UpdateArticleInput } from './inputs/update-Article.input';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private repository: Repository<Article>,
    private readonly draftService: DraftService,
  ) {}

  create(user, createArticleInput: CreateArticleInput) {
    if (user.role === 'user') {
      throw new ForbiddenException('Нет доступа.');
    }

    const article = this.repository.save({
      user: { id: user.id },
      title: createArticleInput.title,
      searchTitle: createArticleInput.title.toLowerCase(),
      description: createArticleInput.description,
      cover: createArticleInput.cover,
      body: createArticleInput.body,
      readingTime: 1,
    });

    if (createArticleInput.draftId) {
      this.draftService.remove(createArticleInput.draftId, user.id);
    }

    return article;
  }

  findAll() {
    return this.repository.find({ order: { createdAt: 'DESC' } });
  }

  findUserArticles(userId: number) {
    return this.repository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    await this.repository.increment({ id }, 'viewsCount', 1);

    const find = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!find) throw new NotFoundException('Статья не найдена');

    return find;
  }

  async update(userId: number, updateArticleInput: UpdateArticleInput) {
    const { id, ...ArticleData } = updateArticleInput;

    const find = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!find) throw new NotFoundException('Статья не найдена');

    if (userId !== find.user.id)
      throw new ForbiddenException('Статья принадлежит другому пользователю.');

    this.repository.update(id, {
      title: ArticleData.title,
      description: ArticleData.description,
      cover: ArticleData.cover,
      body: ArticleData.body,
      readingTime: 1,
    });

    return this.repository.findOne({ where: { id } });
  }

  async remove(id: number, userId: number) {
    const find = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!find) throw new NotFoundException('Статья не найдена');

    if (userId !== find.user.id)
      throw new ForbiddenException('Статья принадлежит другому пользователю.');

    this.repository.softDelete(id);

    return find;
  }

  async findNext(id: number) {
    return await this.repository.find({ where: { id: Not(id) }, take: 3 });
  }
}
