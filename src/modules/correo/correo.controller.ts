import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CorreoService } from './correo.service';
import { CreateCorreoDto, UpdateCorreoDto, CorreoResponseDto } from './dto';
// import { Messages } from '../../shared/constants/messages';
import { PaginationDto } from '../../shared/dto/pagination.dto';

@Controller('correo')
export class CorreoController {
    constructor(private readonly correoService: CorreoService) {}

    @Post()
    @ApiOperation({ summary: 'Crear correo' })
    @ApiBody({
        type: CreateCorreoDto,
        description: 'Datos necesarios para crear un correo',
        examples: {
            ejemplo: {
                summary: 'Ejemplo de payload',
                value: {
                    asunto: 'Asunto del correo',
                    contenido: 'Contenido del correo',
                    tipo: 'entrada',
                    id_persona: 1,
                    id_empresa: 1,
                    id_destino: 1,
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Correo creado', type: CorreoResponseDto })
    async create(@Body() dto: CreateCorreoDto) {
        const correo = await this.correoService.create(dto);
        return { message: 'Correo creado Exitosamente!', data: correo };
    }

    @Get()
    @ApiOperation({ summary: 'Listar correos'})
    @ApiResponse({ status: 200, description: 'Lista de correos', type: [CorreoResponseDto] })
    async findAll(@Query() query: PaginationDto) {
        const { page = 1, limit = 10, search = '' } = query;
        return this.correoService.findAll(Number(page), Number(limit), search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener correo por ID' })
    @ApiParam({ name: 'id', required: true })
    @ApiResponse({ status: 200, description: 'Correo encontrado', type: CorreoResponseDto })
    async findOne(@Param('id') id: number) {
        return this.correoService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar correo' })
    @ApiParam({ name: 'id', required: true })
    @ApiBody({
        type: UpdateCorreoDto,
        description: 'Datos para actualizar un correo',
        examples: {
            ejemplo: {
                summary: 'Ejemplo de payload',
                value: {
                    asunto: 'Asunto del correo',
                    contenido: 'Contenido del correo',
                    tipo: 'entrada',
                    id_persona: 1,
                    id_empresa: 1,
                    id_destino: 1,
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Correo actualizado', type: CorreoResponseDto })
    async update(@Param('id') id: number, @Body() dto: UpdateCorreoDto) {
        const correo = await this.correoService.update(id, dto);
        return { message: 'Correo actualizado', data: correo };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar correo' })
    @ApiParam({ name: 'id', required: true })
    @ApiResponse({ status: 200, description: 'Correo eliminado' })
    async remove(@Param('id') id: number) {
        const correo = await this.correoService.remove(id);
        return { message: 'Correo eliminado', data: correo };
    }
}