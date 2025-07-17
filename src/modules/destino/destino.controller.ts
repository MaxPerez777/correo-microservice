import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { DestinoService } from './destino.service';
import { CreateDestinoDto, UpdateDestinoDto, DestinoResponseDto } from './dto';
// import { Messages } from '../../shared/constants/messages';
import { PaginationDto } from '../../shared/dto/pagination.dto';

@Controller('destino')
export class DestinoController {
    constructor(private readonly destinoService: DestinoService) {}

    @Post()
    @ApiOperation({ summary: 'Crear destino' })
    @ApiBody({
        type: CreateDestinoDto,
        description: 'Datos necesarios para crear un destino',
        examples: {
            ejemplo: {
                summary: 'Ejemplo de payload',
                value: {
                    nombre: 'Nombre del destino',
                    direccion: 'Direccion del destino',
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Destino creado', type: DestinoResponseDto })
    async create(@Body() dto: CreateDestinoDto) {
        const destino = await this.destinoService.create(dto);
        return { message: 'Destino creado Exitosamente!', data: destino };
    }

    @Get()
    @ApiOperation({ summary: 'Listar destinos' })
    @ApiResponse({ status: 200, description: 'Lista de destinos', type: [DestinoResponseDto] })
    async findAll(@Query() query: PaginationDto) {
        const { page = 1, limit = 10, search = '' } = query;
        return this.destinoService.findAll(Number(page), Number(limit), search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener destino por ID' })
    @ApiResponse({ status: 200, description: 'Destino encontrado', type: DestinoResponseDto })
    async findOne(@Param('id') id: number) {
        return this.destinoService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar destino por ID' })
    @ApiParam({ name: 'id', description: 'ID del destino', required: true })
    @ApiBody({
        type: UpdateDestinoDto,
        description: 'Datos para actualizar el destino',
        examples: {
            ejemplo: {
                summary: 'Ejemplo de payload',
                value: {
                    nombre: 'Nombre actualizado',
                    direccion: 'Direccion actualizada',
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Destino actualizado', type: DestinoResponseDto })
    async update(@Param('id') id: number, @Body() dto: UpdateDestinoDto) {
        const destino = await this.destinoService.update(id, dto);
        return { message: 'Destino actualizado', data: destino };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar destino por ID' })
    @ApiParam({ name: 'id', description: 'ID del destino', required: true })
    @ApiResponse({ status: 200, description: 'Destino eliminado' })
    async remove(@Param('id') id: number) {
        const destino = await this.destinoService.remove(id);
        return { message: 'Destino eliminado', data: destino };
    }
}