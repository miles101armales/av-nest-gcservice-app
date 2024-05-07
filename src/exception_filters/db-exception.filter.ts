import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class DatabaseConnectionExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();
    const path = request.url;

    let message = 'Internal server error';
    let statusCode = 500;

    if (
      exception instanceof AggregateError &&
      exception.message.includes('Unable to connect to the database')
    ) {
      message = 'Database connection error';
      statusCode = 503; // Service Unavailable
    }

    response.status(statusCode).json({
      statusCode,
      timestamp,
      path,
      message,
    });
  }
}
