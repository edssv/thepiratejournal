import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
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

    findOneByEmail(email: string) {
        return this.repository.findOne({ where: { email: email } });
    }
}
