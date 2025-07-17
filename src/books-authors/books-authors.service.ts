import { Injectable } from '@nestjs/common';
import { CreateBookAuthorDto } from './dto/create-book-author.dto';
import { UpdateBookAuthorDto } from './dto/update-book-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookAuthor } from './entities/book-author.entity';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { FindAllBookAuthorDto } from './dto/find-all-book-author.dto';
import { BooksAuthorsDto } from './dto/books-authors.dto';

@Injectable()
export class BooksAuthorsService {
  constructor(@InjectRepository(BookAuthor) private bookAuthorRepository: Repository<BookAuthor>){
  
  }

  async create(createBookAuthorDto: CreateBookAuthorDto): Promise<BookAuthor> {
    const book: BookAuthor = this.bookAuthorRepository.create(createBookAuthorDto);
    return this.bookAuthorRepository.save(book);
  }

  async findAll(findAllBookAuthorDto: FindAllBookAuthorDto): Promise<BooksAuthorsDto> {
    const where: FindOptionsWhere<BookAuthor> = {};

    if (findAllBookAuthorDto.idBookAuthor)
      where.idBookAuthor = findAllBookAuthorDto.idBookAuthor;
    if (findAllBookAuthorDto.idBook)
      where.idBook = findAllBookAuthorDto.idBook;
    if (findAllBookAuthorDto.idAutor) 
      where.idAutor = findAllBookAuthorDto.idAutor;

    const [data, count] = await this.bookAuthorRepository.findAndCount({
      where,
      skip: (findAllBookAuthorDto.page - 1) * findAllBookAuthorDto.limit,
      take: findAllBookAuthorDto.limit,
      order: { idBookAuthor: 'ASC' }
    });
    const booksDTO: BooksAuthorsDto = { data, count };
    return booksDTO;
  }

  async findOne(id: number): Promise<BookAuthor|null> {
    const where: FindOptionsWhere<BookAuthor> = { idBookAuthor: id };
    const findOne: BookAuthor|null = await this.bookAuthorRepository.findOne({ where });
    return findOne;
  }

  async update(updateBookAuthorDto: UpdateBookAuthorDto): Promise<Boolean> {
    const updateResult: UpdateResult =  await this.bookAuthorRepository.update(updateBookAuthorDto.idBookAuthor, updateBookAuthorDto);
    return updateResult.affected !== 0;
  }

  async remove(id: number): Promise<Boolean> {
    const updateResult: UpdateResult =  await  this.bookAuthorRepository.softDelete(id);
    return updateResult.affected !== 0;
  }
}
