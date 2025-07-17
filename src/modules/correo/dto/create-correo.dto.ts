import {ApiProperty} from '@nestjs/swagger';
import { IsNumber, IsString } from "class-validator";

export class CreateCorreoDto {
    @ApiProperty({example: 'Solicitud de informacion', description: 'Asunto del correo'})
    @IsString()
    asunto: string;

    @ApiProperty({example: 'Estimado cliente, agradecemos su consulta...', description: 'Contenido del correo'})
    @IsString()
    contenido: string;

    @ApiProperty({example: 'entrada', description: 'Tipo del correo ("entrada" | "salida")'})
    @IsString()
    tipo: string;

    @ApiProperty({example: 1, description: 'ID unico de la persona'})
    @IsNumber()
    id_persona: number;

    @ApiProperty({example: 1, description: 'ID unico de la empresa'})
    @IsNumber()
    id_empresa: number;

    @ApiProperty({example: 1, description: 'ID unico del destino'})
    @IsNumber()
    id_destino: number;
}