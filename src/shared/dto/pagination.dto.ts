/**
 * DTO reutilizable para paginación estándar en endpoints.
 */
import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Messages } from '../constants/messages';

export class PaginationDto {
  @ApiPropertyOptional({ default: 1, description: 'Número de página (paginación)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: Messages.PAGE_MUST_BE_INT })
  @Min(1, { message: Messages.PAGE_MIN })
  page?: number = 1;

  @ApiPropertyOptional({ default: 10, description: 'Cantidad de elementos por página' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: Messages.LIMIT_MUST_BE_INT })
  @Min(1, { message: Messages.LIMIT_MIN })
  limit?: number = 10;

  @ApiPropertyOptional({ default: '', description: 'Texto de búsqueda libre por nombre o descripción' })
  @IsOptional()
  search?: string = '';
}
