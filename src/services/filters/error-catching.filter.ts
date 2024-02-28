import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { error } from 'console';
import { Request, Response } from 'express';

@Injectable()
export class ErrorsCatchingFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.BAD_REQUEST;
    const errorResponse = exception.getResponse();
    const message = (errorResponse as any)?.message || errorResponse;

    console.log(errorResponse);
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
