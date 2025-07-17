import { Module } from '@nestjs/common';
import { GendersService } from './genders.service';
import { GendersController } from './genders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { Message } from 'src/common/utils/message';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gender]),
  ],
  controllers: [GendersController],
  providers: [GendersService, Message],
})
export class GendersModule {}
