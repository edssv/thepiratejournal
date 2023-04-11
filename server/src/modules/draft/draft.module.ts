import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DraftService } from './draft.service';
import { DraftController } from './draft.controller';
import { Draft } from './entities/draft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Draft])],
  controllers: [DraftController],
  providers: [DraftService],
  exports: [DraftService],
})
export class DraftModule {}
