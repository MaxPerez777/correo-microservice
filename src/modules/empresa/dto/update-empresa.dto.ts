import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";


export class UpdateEmpresaDto {
    @ApiProperty({example: 'Empresa de Prueba', description: 'Nombre de la empresa'})
    @IsString()
    @IsOptional()
    nombre?: string;

    @ApiProperty({example: '20212345678', description: 'RUC de la empresa'})
    @IsString()
    @IsOptional()
    ruc?: string;

    @ApiProperty({example: 'Av. Siempre Viva 123', description: 'Direccion de la empresa'})
    @IsString()
    @IsOptional()
    direccion?: string;
}
