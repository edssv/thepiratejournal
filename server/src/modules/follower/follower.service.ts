import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Follower } from './entities/follower.entity';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Follower)
    private repository: Repository<Follower>,
    private readonly userService: UserService
  ) {}

  async create(followingToId: number, userId: number) {
    if (followingToId === userId) throw new NotAcceptableException('Нельзя подписаться на самого себя.');

    const findFollower = await this.repository.findOne({
      where: { user: { id: userId }, followingTo: { id: followingToId } },
    });
    if (findFollower) throw new NotAcceptableException('Уже есть подписка.');

    const find = await this.userService.findOne({ id: followingToId });
    if (!find) throw new NotFoundException('Пользователь не найден.');

    return this.repository.save({ followingTo: { id: followingToId }, user: { id: userId } });
  }

  async remove(followingToId: number, userId: number) {
    const findFollower = await this.repository.findOne({
      where: { user: { id: userId }, followingTo: { id: followingToId } },
    });
    if (!findFollower) throw new NotAcceptableException('Подписки нет.');

    const find = await this.userService.findOne({ id: followingToId });
    if (!find) throw new NotFoundException('Пользователь не найден.');

    return this.repository.delete({ followingTo: { id: followingToId }, user: { id: userId } });
  }
}
