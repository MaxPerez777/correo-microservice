import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CorreoPedidoService } from './correo-pedido.service';
import { CreateCorreoPedidoDto, UpdateCorreoPedidoDto, CorreoPedidoResponseDto } from './dto';
// import { Messages } from '../../shared/constants/messages';
import { PaginationDto } from '../../shared/dto/pagination.dto';

@Controller('correo-pedido')
export class CorreoPedidoController {
    constructor(private readonly correoPedidoService: CorreoPedidoService) {}

    @Post()
    @ApiOperation({ summary: 'Crear correo pedido' })
    @ApiBody({
        type: CreateCorreoPedidoDto,
        description: 'Datos necesarios para crear un correo pedido',
        examples: {
            ejemplo: {
                summary: 'Ejemplo de payload',
                value: {
                    idCorreo: 1,
                    codigo: 'COD-001',
                    estado: 'pendiente',
                    fecha: '2023-01-01',
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Correo pedido creado', type: CorreoPedidoResponseDto })
    async create(@Body() dto: CreateCorreoPedidoDto) {
        const correoPedido = await this.correoPedidoService.create(dto);
        return { message: 'Correo pedido creado Exitosamente!', data: correoPedido };
    }

    @Get()
    @ApiOperation({ summary: 'Listar correos pedidos' })
    @ApiResponse({ status: 200, description: 'Lista de correos pedidos', type: [CorreoPedidoResponseDto] })
    async findAll(@Query() query: PaginationDto) {
        const { page = 1, limit = 10, search = '' } = query;
        return this.correoPedidoService.findAll(Number(page), Number(limit), search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener correo pedido por ID' })
    @ApiParam({ name: 'id', required: true })
    @ApiResponse({ status: 200, description: 'Correo pedido encontrado', type: CorreoPedidoResponseDto })
    async findOne(@Param('id') id: number) {
        return this.correoPedidoService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar correo pedido' })
    @ApiParam({ name: 'id', required: true })
    @ApiBody({
        type: UpdateCorreoPedidoDto,
        description: 'Datos para actualizar un correo pedido',
        examples: {
            ejemplo: {
                summary: 'Ejemplo de payload',
                value: {
                    idCorreo: 1,
                    codigo: 'COD-001',
                    estado: 'pendiente',
                    fecha: '2023-01-01',
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Correo pedido actualizado', type: CorreoPedidoResponseDto })
    async update(@Param('id') id: number, @Body() dto: UpdateCorreoPedidoDto) {
        const correoPedido = await this.correoPedidoService.update(id, dto);
        return { message: 'Correo pedido actualizado', data: correoPedido };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar correo pedido' })
    @ApiParam({ name: 'id', required: true })
    @ApiResponse({ status: 200, description: 'Correo pedido eliminado' })
    async remove(@Param('id') id: number) {
        const correoPedido = await this.correoPedidoService.remove(id);
        return { message: 'Correo pedido eliminado', data: correoPedido };
    }
}
