import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { FindAllBookDto } from './dto/find-all-book.dto';
import { BooksDto } from './dto/books.dto';

@Injectable()
export class BooksService {

  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>){

  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book: Book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async findAll(findAllBookDto: FindAllBookDto): Promise<BooksDto> {
    const where: FindOptionsWhere<Book> = {};

    if (findAllBookDto.idBook)
      where.idBook = findAllBookDto.idBook;
    if (findAllBookDto.title)
      where.title = findAllBookDto.title;
    if (findAllBookDto.idGender) 
      where.idGender = findAllBookDto.idGender;
    if (findAllBookDto.idEditorial) 
      where.idEditorial = findAllBookDto.idEditorial;
    if (findAllBookDto.availability !== null) 
      where.availability = findAllBookDto.availability;
    if (findAllBookDto.imageUrl) 
      where.imageUrl = findAllBookDto.imageUrl;

    const [data, count] = await this.bookRepository.findAndCount({
      where,
      skip: (findAllBookDto.page - 1) * findAllBookDto.limit,
      take: findAllBookDto.limit,
      order: { idBook: 'ASC' }
    });
    const booksDTO: BooksDto = { data, count };
    return booksDTO;
  }

  async findOne(id: number): Promise<Book|null> {
    const where: FindOptionsWhere<Book> = { idBook: id };
    const findOne: Book|null = await this.bookRepository.findOne({ where });
    return findOne;
  }

  async update(updateBookDto: UpdateBookDto): Promise<Boolean> {
    const updateResult: UpdateResult =  await this.bookRepository.update(updateBookDto.idBook, updateBookDto);
    return updateResult.affected !== 0;
  }

  async remove(id: number): Promise<Boolean> {
    const updateResult: UpdateResult =  await  this.bookRepository.softDelete(id);
    return updateResult.affected !== 0;
  }
}
