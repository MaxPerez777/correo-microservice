import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional } from "class-validator";

export class UpdatePersonaDto {
    @ApiPropertyOptional({ example: 1, description: 'ID único de la persona' })
    @IsOptional()
    @IsNumber()
    idPersona?: number;

    @ApiPropertyOptional({ example: 'Juan Perez', description: 'Nombre de la persona' })
    @IsOptional()
    @IsString()
    nombre?: string;

    @ApiPropertyOptional({ example: '45678901', description: 'DNI de la persona' })
    @IsOptional()
    @IsString()
    dni?: string;

    @ApiPropertyOptional({ example: '987654321', description: 'Telefono de la persona' })
    @IsOptional()
    @IsString()
    telefono?: string;

    @ApiPropertyOptional({ example: 'juanperez@gmail.com', description: 'Correo de la persona' })
    @IsOptional()
    @IsString()
    correo?: string;
}