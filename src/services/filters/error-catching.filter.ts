import {
  Injectable,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Models, Strings } from "../../data/strings";

@Injectable()
export class ErrorsCatchingFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number;
    let errorResponse: any;
    let message: any;
    let model: any;

    console.log(exception.model);

    if (
      // exception.includes("Cast to ObjectId failed for value ") ||
      exception.message.includes("Cast to ObjectId failed for value ")
    ) {
      const match = exception.message.match(
        /Cast to ObjectId failed for value "(\w+)"/,
      );
      const fieldName = match ? match[1] : null;
      const id = fieldName.replace("_id", "");

      const splittedMessageArray = exception.message.split(" ");
      const modelText = splittedMessageArray[
        splittedMessageArray.length - 1
      ].replace(/"/g, "");
      const model = Models[modelText];

      message = Strings.objectNotFoundById(model, id);
    } else {
      message = exception.message || exception;
    }

    if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else {
      status = HttpStatus.BAD_REQUEST;
    }

    errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    };

    console.log(errorResponse);
    response.status(status).json(errorResponse);
  }
}
