/**
 * Filtro global reutilizable para manejo de excepciones gRPC.
 */
import { Catch, ArgumentsHost, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { status } from '@grpc/grpc-js';

@Catch()
export class GrpcExceptionFilter implements RpcExceptionFilter<any> {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    return throwError(() => ({
      code: status.UNKNOWN,
      message: exception.message || 'Internal server error',
    }));
  }
}
