import{
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { BaseService } from '../../shared/base/base.service';
import {
    CreateCorreoPedidoDto,
    UpdateCorreoPedidoDto,
    CorreoPedidoResponseDto
} from './dto';
import { CorreoPedidoEntity } from './entities';
import { Messages } from '../../shared/constants/messages';
import { cleanDto } from 'src/shared/utils/clean-dto.util';
// import { cleanDto } from '../../shared/utils/clean-dto.util';

@Injectable()
export class CorreoPedidoService extends BaseService<
    CorreoPedidoEntity,
    CreateCorreoPedidoDto,
    UpdateCorreoPedidoDto,
    CorreoPedidoResponseDto
> {
    protected prismaModel;

    constructor(private readonly prisma: PrismaService) {
        super();
        this.prismaModel = this.prisma.correoPedido;
    }

    async create(
        dto: CreateCorreoPedidoDto,
    ): Promise<CorreoPedidoResponseDto>{
        const entity = await this.prismaModel.create({ data: dto });
        return this.mapToDto(entity);
    }

    async findAll(
        page = 1,
        limit = 10,
        search = '',
    ): Promise<{ data: CorreoPedidoResponseDto[]; meta: any }> {
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
                orderBy: { id_correo_pedido: 'asc'},
            }),
        ]);
        return {
            data: items.map(this.mapToDto),
            meta: {total, page, limit, pages: Math.ceil(total / limit)}
        }
    }
    async findOne(id: number): Promise<CorreoPedidoResponseDto> {
        if(!id){
            throw new BadRequestException('ID es requerido');
        }

        const entity = await this.prismaModel.findUnique({
            where: {
                id_correo_pedido: Number(id),
            },
        });

        if(!entity){
            throw new NotFoundException('Correo Pedido no encontrado');
        }
        return this.mapToDto(entity);
    }

    async update(
        id: number,
        dto: UpdateCorreoPedidoDto,
    ): Promise<CorreoPedidoResponseDto> {
        await this.findOne(id);
        const data = cleanDto(dto);
        try {
            const updated = await this.prismaModel.update({
                where: { id_correo_pedido: id },
                data,
            });
            return this.mapToDto(updated);
        } catch (error) {
            throw new NotFoundException('Correo Pedido no encontrado');
        }
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        try {
            await this.prismaModel.delete({
                where: { id_correo_pedido: id },
            });
        } catch (error) {
            throw new NotFoundException('Correo Pedido no encontrado');
        }
    }

    buildSearchQuery(search: string) {
        return {};
    }
    mapToDto(entity: any): CorreoPedidoResponseDto {
        return {
            idCorreoPedido: entity.id_correo_pedido,
            idCorreo: entity.id_correo,
            codigo: entity.codigo,
            estado: entity.estado,
            fecha: entity.fecha,
        };
    }
}