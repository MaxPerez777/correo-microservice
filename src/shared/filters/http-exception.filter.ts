/**
 * Filtro global reutilizable para manejo de excepciones HTTP.
 */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : 500;

    // Extrae el mensaje real de la excepción
    let mensaje = exception.message;
    if (exception instanceof HttpException) {
      const responseContent = exception.getResponse();
      if (typeof responseContent === 'object' && responseContent !== null) {
        mensaje = (responseContent as any).message || mensaje;
      }
    }
    // Si el mensaje es array (por ejemplo, validaciones), únelo
    if (Array.isArray(mensaje)) {
      mensaje = mensaje.join(', ');
    }
    response.status(status).json({
      statusCode: status,
      message: mensaje,
      error: exception.name || 'Bad Request',
    });
  }
}
