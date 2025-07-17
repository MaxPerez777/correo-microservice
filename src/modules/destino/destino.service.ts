import{
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { BaseService } from '../../shared/base/base.service';
import {
    CreateDestinoDto,
    UpdateDestinoDto,
    DestinoResponseDto
} from './dto';
import { DestinoEntity } from './entities';
import { Messages } from '../../shared/constants/messages';
import { cleanDto } from '../../shared/utils/clean-dto.util';

@Injectable()
export class DestinoService extends BaseService<
    DestinoEntity,
    CreateDestinoDto,
    UpdateDestinoDto,
    DestinoResponseDto
> {
    protected prismaModel;

    constructor(private readonly prisma: PrismaService) {
        super();
        this.prismaModel = this.prisma.destino;
    }

    async create(
        dto: CreateDestinoDto,
    ): Promise<DestinoResponseDto>{
        const entity = await this.prismaModel.create({ data: dto });
        return this.mapToDto(entity);
    }

    async findAll(
        page = 1,
        limit = 10,
        search = '',
    ): Promise<{ data: DestinoResponseDto[]; meta: any }> {
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
                orderBy: { id_destino: 'asc'},
            }),
        ]);
        return {
            data: items.map(this.mapToDto),
            meta: {total, page, limit, pages: Math.ceil(total / limit)}
        }
    }

    async findOne(id: number): Promise<DestinoResponseDto> {
        if(!id){
            throw new BadRequestException('ID es requerido');
        }

        const entity = await this.prismaModel.findUnique({
            where: {
                id_destino: Number(id),
            },
        });

        if(!entity){
            throw new NotFoundException('Destino no encontrado');
        }
        return this.mapToDto(entity);
    }

    async update(
        id: number,
        dto: UpdateDestinoDto,
    ): Promise<DestinoResponseDto> {
        await this.findOne(id);
        const data = cleanDto(dto);
        try {
            const updated = await this.prismaModel.update({
                where: { id_destino: id },
                data,
            });
            return this.mapToDto(updated);
        } catch (error) {
            throw new NotFoundException('Destino no encontrado');
        }
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        try {
            await this.prismaModel.delete({
                where: { id_destino: id },
            });
        } catch (error) {
            throw new NotFoundException('Destino no encontrado');
        }
    }

    buildSearchQuery(search: string) {
        return {};
    }
    mapToDto(entity: any): DestinoResponseDto {
        return {
            idDestino: entity.id_destino,
            nombre: entity.nombre,
            direccion: entity.direccion,
        };
    }
}