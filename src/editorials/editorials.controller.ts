import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EditorialsService } from './editorials.service';
import { Message } from 'src/common/utils/message';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { Editorial } from './entities/editorial.entity';
import { Response } from 'express';
import { FindAllEditorialDto } from './dto/find-all-editorial.dto';
import { EditorialsDto } from './dto/editorials.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Controlador de la entidad editorials')
@Controller('api/editorials')
export class EditorialsController {

    constructor(private readonly message: Message, private readonly editorialsService: EditorialsService) {
        this.message = new Message();
    }

    @ApiOperation({summary: 'Insertar un registro'})
    @ApiBody({type: CreateEditorialDto})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
    @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
    @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Editorial})
    @Post('create')
    async create(@Res() res: Response, @Body() createEditorialDto: CreateEditorialDto) {
        try {
            const create: Editorial = await this.editorialsService.create(createEditorialDto);
            res.status(HttpStatus.OK).send(create);
            return;
        } catch (error: any) {
            this.message.setMessage(1, 'Error al crear editorial', [error.message]);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
            return;
        }
    }

    @ApiOperation({summary: 'Listar todos los registros'})
    @ApiBody({type: FindAllEditorialDto})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
    @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
    @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: EditorialsDto})
    @Post('findAll')
    async findAll(@Res() res: Response, @Body() findAllEditorialDto: FindAllEditorialDto) {
        try {
            const findAll: EditorialsDto = await this.editorialsService.findAll(findAllEditorialDto);
            res.status(HttpStatus.OK).send(findAll);
            return;
        } catch (error: any) {
            this.message.setMessage(1, 'Error al obtener todos los editorial', [error.message]);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
            return;
        }
    }

    @ApiOperation({summary: 'Listar un registro'})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
    @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
    @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Editorial})
    @Get('findOne/:id')
    async findOne(@Res() res: Response, @Param('id') id: number) {
        try {
            const findOne: Editorial|null = await this.editorialsService.findOne(id);
            if (findOne === null) {
                this.message.setMessage(2, 'No encontrado', ['No se encontró el editorial con el id proporcionado']);
                res.status(HttpStatus.BAD_REQUEST).send(this.message);
                return;
            }
            res.status(HttpStatus.OK).send(findOne);
            return;
        } catch (error: any) {
            this.message.setMessage(1, 'Error al obtener editorial por id', [error.message]);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
            return;
        }
    }

    @ApiOperation({summary: 'Actualizar un registro'})
    @ApiBody({type: UpdateEditorialDto})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'No autorizado', type: Message})
    @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
    @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: Boolean})
    @Put('update')
    async update(@Res() res: Response, @Body() updateEditorialDto: UpdateEditorialDto) {
        try {
            const update: Boolean =  await this.editorialsService.update(updateEditorialDto);
            res.status(HttpStatus.OK).send(update);
            return;
        } catch (error: any) {
            this.message.setMessage(1, 'Error al actualizar editorial', [error.message]);
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
            const remove: Boolean =  await  this.editorialsService.remove(id);
            res.status(HttpStatus.OK).send(remove);
            return;
        } catch (error: any) {
            this.message.setMessage(1, 'Error al eliminar editorial', [error.message]);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
            return;
        }
    }
}
