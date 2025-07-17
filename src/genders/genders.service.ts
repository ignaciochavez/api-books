import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from './entities/gender.entity';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { FindAllGenderDto } from './dto/find-all-gender.dto';
import { GendersDto } from './dto/genders.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';

@Injectable()
export class GendersService {
  constructor(@InjectRepository(Gender) private genderRepository: Repository<Gender>){
  
    }
  
    async create(createGenderDto: CreateGenderDto): Promise<Gender> {
      const book: Gender = this.genderRepository.create(createGenderDto);
      return this.genderRepository.save(book);
    }
  
    async findAll(findAllGenderDto: FindAllGenderDto): Promise<GendersDto> {
      const where: FindOptionsWhere<Gender> = {};
  
      if (findAllGenderDto.idGender)
        where.idGender = findAllGenderDto.idGender;
      if (findAllGenderDto.name)
        where.name = findAllGenderDto.name;
  
      const [data, count] = await this.genderRepository.findAndCount({
        where,
        skip: (findAllGenderDto.page - 1) * findAllGenderDto.limit,
        take: findAllGenderDto.limit,
        order: { idGender: 'ASC' }
      });
      const booksDTO: GendersDto = { data, count };
      return booksDTO;
    }
  
    async findOne(id: number): Promise<Gender|null> {
      const where: FindOptionsWhere<Gender> = { idGender: id };
      const findOne: Gender|null = await this.genderRepository.findOne({ where });
      return findOne;
    }
  
    async update(updateGenderDto: UpdateGenderDto): Promise<Boolean> {
      const updateResult: UpdateResult =  await this.genderRepository.update(updateGenderDto.idGender, updateGenderDto);
      return updateResult.affected !== 0;
    }
  
    async remove(id: number): Promise<Boolean> {
      const updateResult: UpdateResult =  await  this.genderRepository.softDelete(id);
      return updateResult.affected !== 0;
    }
}
