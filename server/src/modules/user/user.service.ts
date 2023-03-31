import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {}

    create(createUserDto: CreateUserDto) {
        return this.repository.save(createUserDto);
    }

    async findAll() {
        return this.repository.find({ select: ['id', 'username', 'image'] });
    }

    async findOne(id: number) {
        return this.repository.findOne({ where: { id } });
    }

    async findOneByEmail(email: string) {
        return this.repository.findOne({ where: { email } });
    }

    async findOneById(id: number) {
        const user = await this.repository
            .createQueryBuilder('users')
            .where({ id })
            .leftJoinAndSelect('users.following', 'following')
            .leftJoinAndSelect('users.followers', 'followers')
            .leftJoinAndSelect('users.articles', 'articles')
            .leftJoinAndSelect('users.bookmarks', 'bookmarks')
            .leftJoinAndSelect('users.likes', 'likes')
            .leftJoinAndSelect('users.drafts', 'drafts')
            .getOne()
            .then((a) => ({ ...a, followersCount: a.followers.length }));

        if (!user) throw new NotFoundException('Пользователь не найден');

        return user;
    }

    async findOneWithArticles(id: number, articles: string) {
        const user = await this.repository
            .createQueryBuilder('users')
            .where({ id })
            .leftJoinAndSelect('users.following', 'following')
            .leftJoinAndSelect('users.followers', 'followers')
            .leftJoinAndSelect(`users.${articles}`, `${articles}`)
            .leftJoinAndSelect(`${articles}.user`, 'user')
            .getOne()
            .then((a) => ({ ...a, followersCount: a.followers.length }));

        if (!user) throw new NotFoundException('Пользователь не найден');

        return { ...user, content: user[articles] };
    }

    async findOneByUsername(username: string) {
        return this.repository.findOne({ where: { username } });
    }

    findOneForAuth(email: string) {
        return this.repository.findOne({ where: { email }, select: ['id', 'email', 'password', 'role'] });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.repository.update(id, updateUserDto);
    }

    softDelete(id: number) {
        return this.repository.softDelete(id);
    }

    follow(userId: number, followerId: number) {
        // return this.repository.update(userId, followerId);
    }
}
