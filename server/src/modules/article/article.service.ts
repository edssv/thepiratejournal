import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { SearchArticleDto } from './dto/search-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private repository: Repository<Article>
  ) {}

  create(userId: number, createArticleDto: CreateArticleDto) {
    return this.repository.save({
      user: { id: userId },
      ...createArticleDto,
      searchTitle: createArticleDto.title.toLowerCase(),
    });
  }

  findAll() {
    return this.repository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    return this.repository.findOne({ where: { id }, relations: ['user'] });
  }

  async findOneById(id: number) {
    await this.repository.increment({ id }, 'viewsCount', 1);

    // const find = await this.repository.findOne({ where: { id }, relations: ['user'] });
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

  async update(id: number, userId: number, updateArticleDto: UpdateArticleDto) {
    const find = await this.repository.findOne({ where: { id }, relations: ['user'] });

    if (!find) throw new NotFoundException('Статья не найдена');

    if (userId !== find.user.id) throw new ForbiddenException('Статья принадлежит другому пользователю.');

    return this.repository.update(id, { ...updateArticleDto, searchTitle: updateArticleDto.title.toLowerCase() });
  }

  async remove(userId: number, id: number) {
    const find = await this.repository.findOne({ where: { id } });

    if (!find) throw new NotFoundException('Статья не найдена');

    if (userId !== find.user.id) throw new ForbiddenException('Статья принадлежит другому пользователю.');

    return this.repository.softDelete(id);
  }

  async search(dto: SearchArticleDto) {
    const qb = this.repository.createQueryBuilder('article');
    console.log(dto);
    // const skip = dto.limit * dto.page;
    // // console.log(typeof skip);
    // // qb.limit(dto.limit).skip(skip);
    qb.leftJoinAndSelect('article.user', 'users');
    if (dto.search) qb.andWhere('title LIKE :title', { title: dto.search });
    // if (dto.body) qb.andWhere('body LIKE :body', { body: dto.body });
    // if (dto.tag) qb.andWhere('tag LIKE :tag', { tag: dto.tag });

    if (dto.sort === 'recent') qb.orderBy('created_at', 'DESC');
    if (dto.sort === 'appreciations') qb.orderBy('likes_count', 'DESC');
    if (dto.sort === 'views' || dto.sort === undefined) qb.orderBy('views_count', 'DESC');

    const [articles, total] = await qb.getManyAndCount();

    return { articles, total };
  }

  async findPopular() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('views_count', 'DESC');
    qb.limit(20);

    const [articles, total] = await qb.getManyAndCount();

    return { articles, total };
  }

  async findNewest() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('created_at', 'DESC');
    qb.limit(9);

    return qb.getMany();
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
