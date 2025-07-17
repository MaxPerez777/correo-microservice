import { ApiProperty } from "@nestjs/swagger";

export class EmpresaResponseDto {
    @ApiProperty({example: 1, description: 'ID único de la empresa'})
    idEmpresa: number;

    @ApiProperty({example: 'Empresa de Prueba', description: 'Nombre de la empresa'})
    nombre: string;

    @ApiProperty({example: '20212345678', description: 'RUC de la empresa'})
    ruc: string;

    @ApiProperty({example: 'Av. Siempre Viva 123', description: 'Dirección de la empresa'})
    direccion: string;
}