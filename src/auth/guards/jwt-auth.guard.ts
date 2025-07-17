import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Message } from 'src/common/utils/message';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || user === null || user === false) {
        const message: Message = new Message();
        if (info && info.name === 'TokenExpiredError') {
            message.setMessage(1, 'token expirado', ['El token de autenticación ha expirado. Por favor, inicie sesión de nuevo']);
        } else if (info && info.name === 'JsonWebTokenError') {
            message.setMessage(2, 'token invalido', ['El token de autenticación es inválido o malformado']);
        } else if (err) {
            message.setMessage(3, 'error en token', [err.message || 'Error de autenticación desconocido']);
        }
        else {
            message.setMessage(0, 'No authorizado', ['Se ha denegado la autorizacion para esta solicitud']);
        }
        throw new UnauthorizedException(message);
    }
    return user;
  }
}