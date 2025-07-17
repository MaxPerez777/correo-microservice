import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { BaseService } from '../../shared/base/base.service';
import {
    CreateEmpresaDto,
    UpdateEmpresaDto,
    EmpresaResponseDto
} from './dto';
import { EmpresaEntity } from './entities';
import { Messages } from '../../shared/constants/messages';
import { cleanDto } from '../../shared/utils/clean-dto.util';

@Injectable()
export class EmpresaService extends BaseService<
    EmpresaEntity,
    CreateEmpresaDto,
    UpdateEmpresaDto,
    EmpresaResponseDto
>{
    protected prismaModel;

    constructor(private readonly prisma: PrismaService) {
        super();
        this.prismaModel = this.prisma.empresa;
    }
    async create(
        dto: CreateEmpresaDto,
    ): Promise<EmpresaResponseDto>{
        const entity = await this.prismaModel.create({ data: dto });
        return this.mapToDto(entity);
    }

    async findAll(
        page = 1,
        limit = 10,
        search = '',
    ): Promise<{ data: EmpresaResponseDto[]; meta: any }> {
        if(page < 1 || limit < 1)
            throw new BadRequestException(Messages.PAGINATION_INVALID);
        const skip = (page - 1) * limit;
        const where = this.buildSearchQuery(search);
        const [total, items] = await Promise.all([
            this.prismaModel.count({ where}),
            this.prismaModel.findMany({
                where,
                skip,
                take: limit,
                orderBy: { id_empresa: 'asc'},
            }),
        ]);
        return {
            data: items.map(this.mapToDto),
            meta: {total, page, limit, pages: Math.ceil(total / limit)}
        }
    }
    async findOne(id: number): Promise<EmpresaResponseDto> {
        if(!id){
            throw new BadRequestException('ID es requerido');
        }

        const entity = await this.prismaModel.findUnique({
            where: {
                id_empresa: Number(id),
            },
        });

        if(!entity){
            throw new NotFoundException('Empresa no encontrada');
        }
        return this.mapToDto(entity);
    }

    async update(
        id: number,
        dto: UpdateEmpresaDto,
    ): Promise<EmpresaResponseDto> {
        await this.findOne(id);
        const data = cleanDto(dto);
        try {
            const updated = await this.prismaModel.update({
                where: { id_empresa: id },
                data,
            });
            return this.mapToDto(updated);
        } catch (error) {
            throw new NotFoundException('Empresa no encontrada');
        }
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        try {
            await this.prismaModel.delete({
                where: { id_empresa: id },
            });
        } catch (error) {
            throw new NotFoundException('Empresa no encontrada');
        }
    }

    buildSearchQuery(search: string) {
        return {};
    }
    mapToDto(entity: any): EmpresaResponseDto {
        return {
            idEmpresa: entity.id_empresa,
            nombre: entity.nombre,
            ruc: entity.ruc,
            direccion: entity.direccion,
        };
    }
}