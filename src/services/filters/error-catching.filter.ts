import {
  Injectable,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Fields, Models, Strings } from "../../data/strings";

@Injectable()
export class ErrorsCatchingFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number;
    let errorResponse: any;
    let message: any;

    if (exception.getResponse && typeof exception.getResponse === "function") {
      console.log(exception.getResponse());
    } else {
      console.log(exception);
    }

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
    } else if (exception.message.includes("duplicate key error")) {
      const model =
        Models[
          Strings.capitalizeFirstLetterAndRemoveSymbols(
            request.path.split("/")[1],
          )
        ];
      const field =
        Fields[
          Strings.capitalizeFirstLetterAndRemoveSymbols(
            Object.keys(exception.keyValue)[0],
          )
        ];

      message = Strings.objectWithFieldAlreadyExists(model, field);
    } else {
      message =
        exception.getResponse && typeof exception.getResponse === "function"
          ? exception.getResponse()
          : exception.message;
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

    response.status(status).json(errorResponse);
  }
}
