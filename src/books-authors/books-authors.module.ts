import { Module } from '@nestjs/common';
import { BooksAuthorsService } from './books-authors.service';
import { BooksAuthorsController } from './books-authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookAuthor } from './entities/book-author.entity';
import { Message } from 'src/common/utils/message';

@Module({
  imports: [
      TypeOrmModule.forFeature([BookAuthor]),
    ],
  controllers: [BooksAuthorsController],
  providers: [BooksAuthorsService, Message],
})
export class BooksAuthorsModule {}
