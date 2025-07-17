import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { BaseService } from '../../shared/base/base.service';
import {
    CreateCorreoDto,
    UpdateCorreoDto,
    CorreoResponseDto
} from './dto';
import { CorreoEntity } from './entities';
import { Messages } from '../../shared/constants/messages';
import { cleanDto } from '../../shared/utils/clean-dto.util';

@Injectable()
export class CorreoService extends BaseService<
    CorreoEntity,
    CreateCorreoDto,
    UpdateCorreoDto,
    CorreoResponseDto
> {
    protected prismaModel;

    constructor(private readonly prisma: PrismaService) {
        super();
        this.prismaModel = this.prisma.correo;
    }

    async create(
        dto: CreateCorreoDto,
    ): Promise<CorreoResponseDto>{
        const entity = await this.prismaModel.create({ data: dto });
        return this.mapToDto(entity);
    }

    async findAll(
        page = 1,
        limit = 10,
        search = '',
    ): Promise<{ data: CorreoResponseDto[]; meta: any }> {
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
                orderBy: { id_Correo: 'asc'},
            }),
        ]);
        return {
            data: items.map(this.mapToDto),
            meta: {total, page, limit, pages: Math.ceil(total / limit)}
        }
    }
    async findOne(id: number): Promise<CorreoResponseDto> {
        if(!id){
            throw new BadRequestException('ID es requerido');
        }

        const entity = await this.prismaModel.findUnique({
            where: {
                id_correo: Number(id),
            },
        });

        if(!entity){
            throw new NotFoundException('Correo no encontrado');
        }
        return this.mapToDto(entity);
    }

    async update(
        id: number,
        dto: UpdateCorreoDto,
    ): Promise<CorreoResponseDto> {
        await this.findOne(id);
        const data = cleanDto(dto);
        try {
            const updated = await this.prismaModel.update({
                where: { id_correo: id },
                data,
            });
            return this.mapToDto(updated);
        } catch (error) {
            throw new NotFoundException('Correo no encontrado');
        }
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        try {
            await this.prismaModel.delete({
                where: { id_correo: id },
            });
        } catch (error) {
            throw new NotFoundException('Correo no encontrado');
        }
    }
    buildSearchQuery(search: string) {
        return {};
    }
    mapToDto(entity: any): CorreoResponseDto {
        return {
            idCorreo: entity.id_correo,
            asunto: entity.asunto,
            contenido: entity.contenido,
            tipo: entity.tipo,
            fecha: entity.fecha,
            idPersona: entity.id_persona,
            idEmpresa: entity.id_empresa,
            idDestino: entity.id_destino,
        };
    }
}
