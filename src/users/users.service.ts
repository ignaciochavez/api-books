import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { generateSHA256 } from 'src/common/utils/util';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){
    
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const where: FindOptionsWhere<User> = { email: createUserDto.email };
    const findOne: User|null = await this.userRepository.findOne({ where });
    if (findOne !== null){
      throw Error("Ya existe un usuario registrado con ese email");
    }
    const newCreateUserDto: CreateUserDto = { email: createUserDto.email, password: generateSHA256(createUserDto.password) };
    const book: User = this.userRepository.create(newCreateUserDto);
    return this.userRepository.save(book);
  }

  async authenticate(authenticateUserDto: AuthenticateUserDto): Promise<User|null> {
    const where: FindOptionsWhere<User> = { email: authenticateUserDto.email, password: generateSHA256(authenticateUserDto.password) };
    const findOne: User|null = await this.userRepository.findOne({ where });
    return findOne;
  }

  async updatePassword(updateUserDto: UpdateUserDto): Promise<Boolean> {
    const where: FindOptionsWhere<User> = { email: updateUserDto.email };
    const findOne: User|null = await this.userRepository.findOne({ where });
    if (findOne === null){
      throw Error("No existe un usuario registrado con ese email");
    }
    const newPassword: string = generateSHA256(updateUserDto.email);
    const updateResult: UpdateResult =  await this.userRepository.update(where, { password: newPassword });
    return updateResult.affected !== 0;
  }
}
