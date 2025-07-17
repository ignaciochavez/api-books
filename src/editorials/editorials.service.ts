import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Editorial } from './entities/editorial.entity';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { FindAllEditorialDto } from './dto/find-all-editorial.dto';
import { EditorialsDto } from './dto/editorials.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';

@Injectable()
export class EditorialsService {
    constructor(@InjectRepository(Editorial) private editorialRepository: Repository<Editorial>){
        
    }

    async create(createEditorialDto: CreateEditorialDto): Promise<Editorial> {
        const book: Editorial = this.editorialRepository.create(createEditorialDto);
        return this.editorialRepository.save(book);
    }

    async findAll(findAllEditorialDto: FindAllEditorialDto): Promise<EditorialsDto> {
        const where: FindOptionsWhere<Editorial> = {};
    
        if (findAllEditorialDto.idEditorial)
            where.idEditorial = findAllEditorialDto.idEditorial;
        if (findAllEditorialDto.name)
            where.name = findAllEditorialDto.name;
    
        const [data, count] = await this.editorialRepository.findAndCount({
            where,
            skip: (findAllEditorialDto.page - 1) * findAllEditorialDto.limit,
            take: findAllEditorialDto.limit,
            order: { idEditorial: 'ASC' }
        });
        const booksDTO: EditorialsDto = { data, count };
        return booksDTO;
    }

    async findOne(id: number): Promise<Editorial|null> {
        const where: FindOptionsWhere<Editorial> = { idEditorial: id };
        const findOne: Editorial|null = await this.editorialRepository.findOne({ where });
        return findOne;
    }

    async update(updateEditorialDto: UpdateEditorialDto): Promise<Boolean> {
        const updateResult: UpdateResult =  await this.editorialRepository.update(updateEditorialDto.idEditorial, updateEditorialDto);
        return updateResult.affected !== 0;
    }

    async remove(id: number): Promise<Boolean> {
        const updateResult: UpdateResult =  await  this.editorialRepository.softDelete(id);
        return updateResult.affected !== 0;
    }
}
