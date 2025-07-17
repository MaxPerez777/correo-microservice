import { ApiPropertyOptional} from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional} from "class-validator";


export class UpdateCorreoDto {
    @ApiPropertyOptional({ example: 1, description: 'ID único del correo' })
    @IsOptional()
    @IsNumber()
    id_correo?: number;

    @ApiPropertyOptional({ example: 'Solicitud de informacion', description: 'Asunto del correo' })
    @IsOptional()
    @IsString()
    asunto?: string;

    @ApiPropertyOptional({ example: 'Estimado cliente, agradecemos su consulta...', description: 'Contenido del correo' })
    @IsOptional()
    @IsString()
    contenido?: string;

    @ApiPropertyOptional({ example: 'entrada', description: 'Tipo del correo ("entrada" | "salida")' })
    @IsOptional()
    @IsString()
    tipo?: string;

    @ApiPropertyOptional({ example: 1, description: 'ID único de la persona' })
    @IsOptional()
    @IsNumber()
    id_persona?: number;

    @ApiPropertyOptional({ example: 1, description: 'ID único de la empresa' })
    @IsOptional()
    @IsNumber()
    id_empresa?: number;

    @ApiPropertyOptional({ example: 1, description: 'ID único del destino' })
    @IsOptional()
    @IsNumber()
    id_destino?: number;
}