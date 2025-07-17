import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { EmpresaService } from "./empresa.service";
import { CreateEmpresaDto, UpdateEmpresaDto, EmpresaResponseDto } from "./dto";
// import { Messages } from '../../shared/constants/messages';
import { PaginationDto } from '../../shared/dto/pagination.dto';

@Controller('empresa')
export class EmpresaController {
    constructor(private readonly empresaService: EmpresaService) {}

    @Post()
    @ApiOperation({ summary: 'Crear empresa' })
    @ApiBody({
        type: CreateEmpresaDto,
        description: 'Datos necesarios para crear una empresa',
        examples: {
            ejemplo: {
                summary: 'Ejemplo de payload',
                value: {
                    nombre: 'Empresa 1',
                    ruc: '20123456789',
                    direccion: 'Av. Principal',
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Empresa creada', type: EmpresaResponseDto })
    async create(@Body() dto: CreateEmpresaDto) {
        const empresa = await this.empresaService.create(dto);
        return { message: 'Empresa creada Exitosamente!', data: empresa };
    }

    @Get()
    @ApiOperation({ summary: 'Listar empresas' })
    @ApiResponse({ status: 200, description: 'Lista de empresas', type: [EmpresaResponseDto] })
    async findAll(@Query() query: PaginationDto) {
        const { page = 1, limit = 10, search = '' } = query;
        return this.empresaService.findAll(Number(page), Number(limit), search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener empresa por ID' })
    @ApiParam({ name: 'id', required: true })
    @ApiResponse({ status: 200, description: 'Empresa encontrada', type: EmpresaResponseDto })
    async findOne(@Param('id') id: number) {
        return this.empresaService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar empresa' })
    @ApiParam({ name: 'id', required: true })
    @ApiBody({
        type: UpdateEmpresaDto,
        description: 'Datos para actualizar una empresa',
        examples: {
            ejemplo: {
                summary: 'Ejemplo de payload',
                value: {
                    nombre: 'Empresa 1',
                    ruc: '20123456789',
                    direccion: 'Av. Principal',
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Empresa actualizada', type: EmpresaResponseDto })
    async update(@Param('id') id: number, @Body() dto: UpdateEmpresaDto) {
        const empresa = await this.empresaService.update(id, dto);
        return { message: 'Empresa actualizada Exitosamente!', data: empresa };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar empresa' })
    @ApiParam({ name: 'id', required: true })
    @ApiResponse({ status: 200, description: 'Empresa eliminada' })
    async remove(@Param('id') id: number) {
        const empresa = await this.empresaService.remove(id);
        return { message: 'Empresa eliminada Exitosamente!', data: empresa };
    }
}
