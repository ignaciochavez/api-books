import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { FindAllAuthorDto } from './dto/find-all-author.dto';
import { AuthorsDto } from './dto/authors.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(@InjectRepository(Author) private authorRepository: Repository<Author>){
    
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const book: Author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(book);
  }

  async findAll(findAllAuthorDto: FindAllAuthorDto): Promise<AuthorsDto> {
    const where: FindOptionsWhere<Author> = {};

    if (findAllAuthorDto.idAuthor)
      where.idAuthor = findAllAuthorDto.idAuthor;
    if (findAllAuthorDto.name)
      where.name = findAllAuthorDto.name;

    const [data, count] = await this.authorRepository.findAndCount({
      where,
      skip: (findAllAuthorDto.page - 1) * findAllAuthorDto.limit,
      take: findAllAuthorDto.limit,
      order: { idAuthor: 'ASC' }
    });
    const booksDTO: AuthorsDto = { data, count };
    return booksDTO;
  }

  async findOne(id: number): Promise<Author|null> {
    const where: FindOptionsWhere<Author> = { idAuthor: id };
    const findOne: Author|null = await this.authorRepository.findOne({ where });
    return findOne;
  }

  async update(updateAuthorDto: UpdateAuthorDto): Promise<Boolean> {
    const updateResult: UpdateResult =  await this.authorRepository.update(updateAuthorDto.idAuthor, updateAuthorDto);
    return updateResult.affected !== 0;
  }

  async remove(id: number): Promise<Boolean> {
    const updateResult: UpdateResult =  await  this.authorRepository.softDelete(id);
    return updateResult.affected !== 0;
  }
}
