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

    async findOne(id: number) {
        const user = await this.repository.findOne({ where: { id } });

        if (!user) throw new NotFoundException('Пользователь не найден');

        return user;
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
