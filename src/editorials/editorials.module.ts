import { Module } from '@nestjs/common';
import { EditorialsController } from './editorials.controller';
import { EditorialsService } from './editorials.service';
import { Editorial } from './entities/editorial.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/common/utils/message';

@Module({
  imports: [
        TypeOrmModule.forFeature([Editorial]),
      ],
  controllers: [EditorialsController],
  providers: [EditorialsService, Message]
})
export class EditorialsModule {}
