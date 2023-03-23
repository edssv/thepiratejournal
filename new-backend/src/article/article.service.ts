import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    create(createArticleDto: CreateArticleDto) {
        return this.repository.save(createArticleDto);
    }

    findAll() {
        return this.repository.find({ order: { createdAt: 'DESC' } });
    }

    async findPopular() {
        const qb = this.repository.createQueryBuilder();

        qb.orderBy('views_count', 'DESC');
        qb.limit(20);

        const [articles, total] = await qb.getManyAndCount();

        return { articles, total };
    }

    async search(searchArticleDto: SearchArticleDto) {
        const qb = this.repository.createQueryBuilder();

        qb.limit(20).skip(20);

        if (searchArticleDto.title) qb.where(`p.body ILIKE %${searchArticleDto.title}`);

        if (searchArticleDto.body) qb.where(`p.body ILIKE %${searchArticleDto.body}`);

        if (searchArticleDto.tag) qb.where(`p.body ILIKE %${searchArticleDto.tag}`);

        const [articles, total] = await qb.getManyAndCount();

        return { articles, total };
    }

    async findOne(id: number) {
        const find = await this.repository.findOne({ where: { id } });

        if (!find) throw new NotFoundException('Статья не найдена');

        return this.repository.findOne({ where: { id } });
    }

    async update(id: number, updateArticleDto: UpdateArticleDto) {
        const find = await this.repository.findOne({ where: { id } });

        if (!find) throw new NotFoundException('Статья не найдена');

        return this.repository.update(id, updateArticleDto);
    }

    async remove(id: number) {
        const find = await this.repository.findOne({ where: { id } });

        if (!find) throw new NotFoundException('Статья не найдена');

        return this.repository.softDelete(id);
    }
}
