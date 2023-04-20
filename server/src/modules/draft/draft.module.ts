import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DraftService } from './draft.service';
import { DraftController } from './draft.controller';
import { Draft } from './entities/draft.entity';
import { DraftResolver } from './draft.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Draft])],
  controllers: [DraftController],
  providers: [DraftService, DraftResolver],
  exports: [DraftService],
})
export class DraftModule {}
