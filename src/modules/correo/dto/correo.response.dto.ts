import { ApiProperty } from '@nestjs/swagger';

export class CorreoResponseDto {
    @ApiProperty({example: 1, description: 'ID único del correo'})
    idCorreo: number;

    @ApiProperty({example: 'Solicitud de informacion', description: 'Asunto del correo'})
    asunto: string;

    @ApiProperty({example: 'Estimado cliente, agradecemos su consulta...', description: 'Contenido del correo'})
    contenido: string;

    @ApiProperty({example: 'entrada', description: 'Tipo del correo ("entrada" | "salida")'})
    tipo: string;

    @ApiProperty({example: '2025-07-16T10:30:00.000Z', description: 'Fecha del correo'})
    fecha: Date;

    @ApiProperty({example: 1, description: 'ID único de la persona'})
    idPersona: number;

    @ApiProperty({example: 1, description: 'ID único de la empresa'})
    idEmpresa: number;

    @ApiProperty({example: 1, description: 'ID único del destino'})
    idDestino: number;
}