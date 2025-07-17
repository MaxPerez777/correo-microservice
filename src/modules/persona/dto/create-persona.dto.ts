import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreatePersonaDto {
    @ApiProperty({example: 'Juan Perez', description: 'Nombre de la persona'})
    @IsString()
    nombre: string;

    @ApiProperty({example: '45678901', description: 'DNI de la persona'})
    @IsString()
    dni: string;

    @ApiProperty({example: '987654321', description: 'Telefono de la persona'})
    @IsString()
    telefono: string;

    @ApiProperty({example: 'juanperez@gmail.com', description: 'Correo de la persona'})
    @IsString()
    correo: string;
}
