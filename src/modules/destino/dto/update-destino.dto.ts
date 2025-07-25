import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString} from "class-validator";

export class UpdateDestinoDto {
    @ApiPropertyOptional({ example: 'Nombre del Destino', description: 'Nombre del destino' })
    @IsString()
    nombre: string;

    @ApiPropertyOptional({ example: 'Dirección del Destino', description: 'Dirección del destino' })
    @IsString()
    direccion: string;
}