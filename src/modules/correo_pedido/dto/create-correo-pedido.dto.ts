import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCorreoPedidoDto {
    @ApiProperty({example: 1, description: 'ID unico del correo'})
    @IsNumber()
    id_correo: number;

    @ApiProperty({example: '123456789', description: 'Código de seguimiento o registro'})
    @IsString()
    codigo: string;

    @ApiProperty({example: 'pendiente', description: 'Estado del correo pedido'})
    @IsString()
    estado: string;

}
