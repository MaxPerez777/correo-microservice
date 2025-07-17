import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateDestinoDto {
    @ApiProperty({ example: 'Nombre del Destino' })
    @IsString()
    nombre: string;

    @ApiProperty({ example: 'Dirección del Destino' })
    @IsString()
    direccion: string;
}
