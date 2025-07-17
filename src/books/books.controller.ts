import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, UseGuards, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FindAllBookDto } from './dto/find-all-book.dto';
import { Book } from './entities/book.entity';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Message } from 'src/common/utils/message';
import { BooksDto } from './dto/books.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Controlador de la entidad books')
@Controller('api/books')
export class BooksController {

  constructor(private readonly message: Message, private readonly booksService: BooksService) {
    this.message = new Message();
  }

  @ApiOperation({summary: 'Insertar un registro'})
  @ApiBody({type: CreateBookDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Book})
  @Post('create')
  async create(@Res() res: Response, @Body() createBookDto: CreateBookDto) {
    try {
      const create: Book = await this.booksService.create(createBookDto);
      res.status(HttpStatus.OK).send(create);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al crear book', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Listar todos los registros'})
  @ApiBody({type: FindAllBookDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: BooksDto})
  @Post('findAll')
  async findAll(@Res() res: Response, @Body() findAllBookDto: FindAllBookDto) {
    try {
      const findAll: BooksDto = await this.booksService.findAll(findAllBookDto);
      res.status(HttpStatus.OK).send(findAll);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al obtener todos los books', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Listar un registro'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Book})
  @Get('findOne/:id')
  async findOne(@Res() res: Response, @Param('id') id: number) {
    try {
      const findOne: Book|null = await this.booksService.findOne(id);
      if (findOne === null) {
        this.message.setMessage(2, 'No encontrado', ['No se encontró el book con el id proporcionado']);
        res.status(HttpStatus.BAD_REQUEST).send(this.message);
        return;
      }
      res.status(HttpStatus.OK).send(findOne);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al obtener book por id', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Actualizar un registro'})
  @ApiBody({type: UpdateBookDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Boolean})
  @Put('update')
  async update(@Res() res: Response, @Body() updateBookDto: UpdateBookDto) {
    try {
      const update: Boolean =  await this.booksService.update(updateBookDto);
      res.status(HttpStatus.OK).send(update);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al actualizar book', [error.message]);
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
      const remove: Boolean =  await  this.booksService.remove(id);
      res.status(HttpStatus.OK).send(remove);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al eliminar book', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }
}
