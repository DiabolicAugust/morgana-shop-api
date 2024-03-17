import {
  Injectable,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class ErrorsCatchingFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number;
    let errorResponse: any;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorResponse = exception.getResponse();
    } else {
      status = HttpStatus.BAD_REQUEST;
      errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message || exception,
      };
    }

    console.log(errorResponse);
    response.status(status).json(errorResponse);
  }
}
