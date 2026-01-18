import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { ApplicationError } from '@application/errors/application.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // 👇 MOSTRA O ERRO REAL
    console.error('🔥 EXCEPTION:', exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ApplicationError) {
      return response.status(exception.statusCode).json({
        statusCode: exception.statusCode,
        message: exception.message,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      let message: unknown = res;
      if (typeof res === 'object' && res && 'message' in (res as any)) {
        message = (res as any).message;
      }

      return response.status(status).json({
        statusCode: status,
        message,
      });
    }

    return response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}