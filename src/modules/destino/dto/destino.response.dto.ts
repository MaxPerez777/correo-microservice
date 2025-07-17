import { ApiProperty } from "@nestjs/swagger";

export class DestinoResponseDto {
    @ApiProperty({example: 1, description: 'ID unico del destino'})
    idDestino: number;

    @ApiProperty({example: 'Nombre del Destino', description: 'Nombre del destino'})
    nombre: string;

    @ApiProperty({example: 'Dirección del Destino', description: 'Dirección del destino'})
    direccion: string;
}
