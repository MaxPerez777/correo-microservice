import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PersonaService } from './persona.service';
import { CreatePersonaDto, UpdatePersonaDto, PersonaResponseDto } from './dto';
import { PaginationDto } from '../../shared/dto/pagination.dto';

@Controller('persona')
export class PersonaController {
    constructor(private readonly personaService: PersonaService) {}

    @Post()
    @ApiOperation({ summary: 'Crear persona' })
    @ApiBody({
        type: CreatePersonaDto,
        description: 'Datos necesarios para crear una persona',
        examples: {
            ejemplo: {
                summary: 'Ejemplo de payload',
                value: {
                    nombre: 'Juan Perez',
                    dni: '44444444',
                    telefono: '99999999',
                    correo: 'juanperez@example.com',
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Persona creada', type: PersonaResponseDto })
    async create(@Body() dto: CreatePersonaDto) {
        const persona = await this.personaService.create(dto);
        return { message: 'Persona creada Exitosamente!', data: persona };
    }

    @Get()
    @ApiOperation({ summary: 'Listar personas' })
    @ApiResponse({ status: 200, description: 'Lista de personas', type: [PersonaResponseDto] })
    async findAll(@Query() query: PaginationDto) {
        const { page = 1, limit = 10, search = '' } = query;
        return this.personaService.findAll(Number(page), Number(limit), search);
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Obtener persona por ID' })
    @ApiParam({ name: 'id', required: true })
    @ApiResponse({ status: 200, description: 'Persona encontrada', type: PersonaResponseDto })
    async findOne(@Param('id') id: number) {
        return this.personaService.findOne(id);
    }
    
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar persona' })
    @ApiParam({ name: 'id', required: true })
    @ApiBody({
        type: UpdatePersonaDto,
        description: 'Datos para actualizar una persona',
        examples: {
            ejemplo: {
                summary: 'Ejemplo de payload',
                value: {
                    nombre: 'Juan Perez',
                    dni: '44444444',
                    telefono: '99999999',
                    correo: 'juanperez@example.com',
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Persona actualizada', type: PersonaResponseDto })
    async update(@Param('id') id: number, @Body() dto: UpdatePersonaDto) {
        const persona = await this.personaService.update(id, dto);
        return { message: 'Persona actualizada Exitosamente!', data: persona };
    }
    
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar persona' })
    @ApiParam({ name: 'id', required: true })
    @ApiResponse({ status: 200, description: 'Persona eliminada' })
    async remove(@Param('id') id: number) {
        await this.personaService.remove(id);
        return { message: 'Persona eliminada Exitosamente!', success: true };
    }
}