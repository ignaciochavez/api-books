import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, Res, Put } from '@nestjs/common';
import { BooksAuthorsService } from './books-authors.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { Message } from 'src/common/utils/message';
import { CreateBookAuthorDto } from './dto/create-book-author.dto';
import { BookAuthor } from './entities/book-author.entity';
import { FindAllBookAuthorDto } from './dto/find-all-book-author.dto';
import { BooksAuthorsDto } from './dto/books-authors.dto';
import { UpdateBookAuthorDto } from './dto/update-book-author.dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Controlador de la entidad booksAuthors')
@Controller('api/booksAuthors')
export class BooksAuthorsController {

  constructor(private readonly message: Message, private readonly booksAuthorsService: BooksAuthorsService) {
    this.message = new Message();
  }

  @ApiOperation({summary: 'Insertar un registro'})
  @ApiBody({type: CreateBookAuthorDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: BookAuthor})
  @Post('create')
  async create(@Res() res: Response, @Body() createBookAuthorDto: CreateBookAuthorDto) {
    try {
      const create: BookAuthor = await this.booksAuthorsService.create(createBookAuthorDto);
      res.status(HttpStatus.OK).send(create);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al crear bookAuthor', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Listar todos los registros'})
  @ApiBody({type: FindAllBookAuthorDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: BooksAuthorsDto})
  @Post('findAll')
  async findAll(@Res() res: Response, @Body() findAllBookAuthorDto: FindAllBookAuthorDto) {
    try {
      const findAll: BooksAuthorsDto = await this.booksAuthorsService.findAll(findAllBookAuthorDto);
      res.status(HttpStatus.OK).send(findAll);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al obtener todos los bookAuthor', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Listar un registro'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: BookAuthor})
  @Get('findOne/:id')
  async findOne(@Res() res: Response, @Param('id') id: number) {
    try {
      const findOne: BookAuthor|null = await this.booksAuthorsService.findOne(id);
      if (findOne === null) {
        this.message.setMessage(2, 'No encontrado', ['No se encontró el bookAuthor con el id proporcionado']);
        res.status(HttpStatus.BAD_REQUEST).send(this.message);
        return;
      }
      res.status(HttpStatus.OK).send(findOne);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al obtener bookAuthor por id', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Actualizar un registro'})
  @ApiBody({type: UpdateBookAuthorDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Boolean})
  @Put('update')
  async update(@Res() res: Response, @Body() updateBookAuthorDto: UpdateBookAuthorDto) {
    try {
      const update: Boolean =  await this.booksAuthorsService.update(updateBookAuthorDto);
      res.status(HttpStatus.OK).send(update);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al actualizar bookAuthor', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Eliminar un registro'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Message})
  @Delete('remove/:id')
  async remove(@Res() res: Response, @Param('id') id: number) {
    try {
      const remove: Boolean =  await  this.booksAuthorsService.remove(id);
      res.status(HttpStatus.OK).send(remove);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al eliminar bookAuthor', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }
}
