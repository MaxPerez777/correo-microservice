import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class UpdateCorreoPedidoDto {
    @ApiPropertyOptional({example: 1, description: 'ID unico del correo pedido'})
    @IsNumber()
    id_correo_pedido?: number;

    @ApiPropertyOptional({example: 1, description: 'ID unico del correo'})
    @IsNumber()
    id_correo?: number;

    @ApiPropertyOptional({example: '123456789', description: 'Código de seguimiento o registro'})
    @IsString()
    codigo?: string;

    @ApiPropertyOptional({example: 'pendiente', description: 'Estado del correo pedido'})
    @IsString()
    estado?: string;
}
