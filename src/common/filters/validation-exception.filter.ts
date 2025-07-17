import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpStatus, } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { Message } from 'src/common/utils/message';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(badRequestException: BadRequestException, argumentsHost: ArgumentsHost) {
    const httpArgumentsHost: HttpArgumentsHost = argumentsHost.switchToHttp();
    const response: Response<any, Record<string, any>> = httpArgumentsHost.getResponse<Response>();

    const message: Message = new Message();
    message.setIdTitle(1, "Parametros invalidos");

    const responseBody: string | object = badRequestException.getResponse();
    const validationErrors: any = (responseBody as any).message;
  
    if (Array.isArray(validationErrors)) {
        validationErrors.forEach((msg: string) => {
          message.messages.push(msg);
        });
    } else {
        message.messages.push(typeof validationErrors === 'string' ? validationErrors : JSON.stringify(validationErrors));
    }

    response.status(HttpStatus.BAD_REQUEST).json(message);
  }
}