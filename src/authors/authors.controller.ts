import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, Res, Put } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Message } from 'src/common/utils/message';
import { Author } from './entities/author.entity';
import { Response } from 'express';
import { FindAllAuthorDto } from './dto/find-all-author.dto';
import { AuthorsDto } from './dto/authors.dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Controlador de la entidad authors')
@Controller('api/authors')
export class AuthorsController {

  constructor(private readonly message: Message, private readonly authorsService: AuthorsService) {
    this.message = new Message();
  }

  @ApiOperation({summary: 'Insertar un registro'})
  @ApiBody({type: CreateAuthorDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Author})
  @Post('create')
  async create(@Res() res: Response, @Body() createAuthorDto: CreateAuthorDto) {
    try {
      const create: Author = await this.authorsService.create(createAuthorDto);
      res.status(HttpStatus.OK).send(create);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al crear author', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Listar todos los registros'})
  @ApiBody({type: FindAllAuthorDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: AuthorsDto})
  @Post('findAll')
  async findAll(@Res() res: Response, @Body() findAllAuthorDto: FindAllAuthorDto) {
    try {
      const findAll: AuthorsDto = await this.authorsService.findAll(findAllAuthorDto);
      res.status(HttpStatus.OK).send(findAll);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al obtener todos los author', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Listar un registro'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Author})
  @Get('findOne/:id')
  async findOne(@Res() res: Response, @Param('id') id: number) {
    try {
      const findOne: Author|null = await this.authorsService.findOne(id);
      if (findOne === null) {
        this.message.setMessage(2, 'No encontrado', ['No se encontró el author con el id proporcionado']);
        res.status(HttpStatus.BAD_REQUEST).send(this.message);
        return;
      }
      res.status(HttpStatus.OK).send(findOne);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al obtener author por id', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Actualizar un registro'})
  @ApiBody({type: UpdateAuthorDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Boolean})
  @Put('update')
  async update(@Res() res: Response, @Body() updateAuthorDto: UpdateAuthorDto) {
    try {
      const update: Boolean =  await this.authorsService.update(updateAuthorDto);
      res.status(HttpStatus.OK).send(update);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al actualizar author', [error.message]);
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
      const remove: Boolean =  await this.authorsService.remove(id);
      res.status(HttpStatus.OK).send(remove);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al eliminar author', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }
}
