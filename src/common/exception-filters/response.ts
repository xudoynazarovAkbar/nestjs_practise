import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

interface HttpExceptionResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

@Catch()
export class ResponseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const message =
        typeof exceptionResponse === 'object'
          ? (exceptionResponse as HttpExceptionResponse).message
          : exception.message;

      return response.status(status).json({
        ok: false,
        message,
      });
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      ok: false,
      message: 'Internal server error',
    });
  }
}
