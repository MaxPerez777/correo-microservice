import { ApiProperty } from "@nestjs/swagger";

export class CorreoPedidoResponseDto {
    @ApiProperty({example: 1, description: 'ID único del correo pedido'})
    idCorreoPedido: number;

    @ApiProperty({example: 1, description: 'ID único del correo'})
    idCorreo: number;

    @ApiProperty({example: '123456789', description: 'Código de seguimiento o registro'})
    codigo: string;

    @ApiProperty({example: 'pendiente', description: 'Estado del correo pedido'})
    estado: string;

    @ApiProperty({example: '2025-07-16T10:30:00.000Z', description: 'Fecha del correo pedido'})
    fecha: Date;
}
