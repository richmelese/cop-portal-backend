import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import type { Request, Response } from "express";

export interface ApiErrorResponse {
  success: false;
  error: {
    statusCode: number;
    error: string;
    message: string | string[];
    path: string;
    timestamp: string;
  };
}

/**
 * Catches every thrown error (HttpException or otherwise) and formats it into
 * one consistent error envelope, instead of each handler shaping its own.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger("ExceptionFilter");

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = "Internal server error";
    let error = "Internal Server Error";

    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      if (typeof body === "string") {
        message = body;
        error = exception.name;
      } else if (typeof body === "object" && body !== null) {
        const b = body as Record<string, unknown>;
        message = (b.message as string | string[] | undefined) ?? exception.message;
        error = (b.error as string | undefined) ?? exception.name;
      }
    } else if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack);
    } else {
      this.logger.error("Unknown exception thrown", JSON.stringify(exception));
    }

    const body: ApiErrorResponse = {
      success: false,
      error: {
        statusCode: status,
        error,
        message,
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    };

    response.status(status).json(body);
  }
}
