import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Message } from 'src/common/utils/message';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('Controlador de la entidad users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly message: Message,  private readonly usersService: UsersService, private readonly authService: AuthService) {
    this.message = new Message();
  }

  @ApiOperation({summary: 'Insertar un usuario'})
  @ApiBody({type: CreateUserDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: User})
  @Post('create')
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      const create: User = await this.usersService.create(createUserDto);
      res.status(HttpStatus.OK).send(create);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al crear user', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiOperation({summary: 'Authenticarse'})
  @ApiBody({type: CreateUserDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: String})
  @Post('authenticate')
  async authenticate(@Res() res: Response, @Body() authenticateUserDto: AuthenticateUserDto) {
    try {
      const authenticate: User|null = await this.usersService.authenticate(authenticateUserDto);
      if (authenticate === null){
        this.message.setMessage(2, 'No autorizado', ['email o password incorrecto']);
        res.status(HttpStatus.BAD_REQUEST).send(this.message);
      } else {
        const accessToken = await this.authService.createToken({ sub: authenticate.idUser, username: authenticate.email });
        res.status(HttpStatus.OK).send(accessToken.access_token);
      }
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al crear authenticarse', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'Authenticarse'})
  @ApiBody({type: CreateUserDto})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: 'Parametros invalidos', type: Message})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error interno del servidor', type: Message})
  @ApiResponse({status: HttpStatus.OK, description: 'El objeto ha sido procesado', type: User})
  @Get('updatePassword')
  async updatePassword(@Res() res: Response, @Param() updateUserDto: UpdateUserDto) {
    try {
      const authenticate: Boolean = await this.usersService.updatePassword(updateUserDto);
      res.status(HttpStatus.OK).send(authenticate);
      return;
    } catch (error: any) {
      this.message.setMessage(1, 'Error al crear actualizar contraseña', [error.message]);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(this.message);
      return;
    }
  }
}
