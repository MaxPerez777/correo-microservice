import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateEmpresaDto {
    @ApiProperty({ example: 'Empresa de Prueba', description: 'Nombre de la empresa' })
    @IsString()
    nombre: string;

    @ApiProperty({ example: '20212345678', description: 'RUC de la empresa' })
    @IsString()
    ruc: string;

    @ApiProperty({ example: 'Av. Siempre Viva 123', description: 'Direccion de la empresa' })
    @IsString()
    direccion: string;
}