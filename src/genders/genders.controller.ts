import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put, UseGuards } from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Message } from 'src/common/utils/message';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Gender } from './entities/gender.entity';
import { Response } from 'express';
import { FindAllGenderDto } from './dto/find-all-gender.dto';
import { GendersDto } from './dto/genders.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Controlador de la entidad genders')
@Controller('api/genders')
export class GendersController {

  constructor(private readonly message: Message, private readonly gendersService: GendersService) {
      this.message = new Message();
  }

  @ApiOperation({summary: 'Insertar un registro'})
  @ApiBody({type: CreateGenderDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Gender})
  @Post('create')
  async create(@Res() res: Response, @Body() createGenderDto: CreateGenderDto) {
    try {
      const create: Gender = await this.gendersService.create(createGenderDto);
      res.status(HttpStatus.OK).send(create);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al crear gender', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Listar todos los registros'})
  @ApiBody({type: FindAllGenderDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: GendersDto})
  @Post('findAll')
  async findAll(@Res() res: Response, @Body() findAllGenderDto: FindAllGenderDto) {
    try {
      const findAll: GendersDto = await this.gendersService.findAll(findAllGenderDto);
      res.status(HttpStatus.OK).send(findAll);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al obtener todos los gender', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Listar un registro'})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Gender})
  @Get('findOne/:id')
  async findOne(@Res() res: Response, @Param('id') id: number) {
    try {
      const findOne: Gender|null = await this.gendersService.findOne(id);
      if (findOne === null) {
        this.message.setMessage(2, 'No encontrado', ['No se encontró el gender con el id proporcionado']);
        res.status(HttpStatus.BAD_REQUEST).send(this.message);
        return;
      }
      res.status(HttpStatus.OK).send(findOne);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al obtener gender por id', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Actualizar un registro'})
  @ApiBody({type: UpdateGenderDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Boolean})
  @Put('update')
  async update(@Res() res: Response, @Body() updateGenderDto: UpdateGenderDto) {
    try {
      const update: Boolean =  await this.gendersService.update(updateGenderDto);
      res.status(HttpStatus.OK).send(update);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al actualizar gender', [error.message]);
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
      const remove: Boolean =  await  this.gendersService.remove(id);
      res.status(HttpStatus.OK).send(remove);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al eliminar gender', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }
}
