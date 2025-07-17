import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entities/book.entity';
import { EditorialsModule } from './editorials/editorials.module';
import { GendersModule } from './genders/genders.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorsModule } from './authors/authors.module';
import { BooksAuthorsModule } from './books-authors/books-authors.module';
import { Gender } from './genders/entities/gender.entity';
import { Editorial } from './editorials/entities/editorial.entity';
import { Author } from './authors/entities/author.entity';
import { BookAuthor } from './books-authors/entities/book-author.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Gender, Editorial, Author, Book, BookAuthor, User],
      synchronize: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'tests' ? true : false,
    }),
    EditorialsModule,
    GendersModule,
    BooksModule,
    AuthModule,
    AuthorsModule,
    BooksAuthorsModule,
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
