import { ApiProperty } from "@nestjs/swagger";

export class PersonaResponseDto {
    @ApiProperty({example: 1, description: 'ID único de la persona'})
    idPersona: number;

    @ApiProperty({example: 'Juan Perez', description: 'Nombre de la persona'})
    nombre: string;

    @ApiProperty({example: '45678901', description: 'DNI de la persona'})
    dni: string;

    @ApiProperty({example: '987654321', description: 'Telefono de la persona'})
    telefono: string;

    @ApiProperty({example: 'juanperez@gmail.com', description: 'Correo de la persona'})
    correo: string;
}