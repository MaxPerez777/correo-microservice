import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { BaseService } from '../../shared/base/base.service';
import {
    CreatePersonaDto,
    UpdatePersonaDto,
    PersonaResponseDto
} from './dto';
import { PersonaEntity } from './entities';
import { Messages } from '../../shared/constants/messages';
import { cleanDto } from '../../shared/utils/clean-dto.util';

@Injectable()
export class PersonaService extends BaseService<
    PersonaEntity,
    CreatePersonaDto,
    UpdatePersonaDto,
    PersonaResponseDto
> {
    protected prismaModel;

    constructor(private readonly prisma: PrismaService) {
        super();
        this.prismaModel = this.prisma.persona;
    }

    async create(
        dto: CreatePersonaDto,
    ): Promise<PersonaResponseDto>{
        const entity = await this.prismaModel.create({ data: dto });
        return this.mapToDto(entity);
    }

    async findAll(
        page = 1,
        limit = 10,
        search = '',
    ): Promise<{ data: PersonaResponseDto[]; meta: any }> {
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
                orderBy: { id_persona: 'asc'},
            }),
        ]);
        return {
            data: items.map(this.mapToDto),
            meta: {total, page, limit, pages: Math.ceil(total / limit)}
        }
    }

    async findOne(id: number): Promise<PersonaResponseDto> {
        if(!id){
            throw new BadRequestException('ID es requerido');
        }

        const entity = await this.prismaModel.findUnique({
            where: {
                id_persona: Number(id),
            },
        });

        if(!entity){
            throw new NotFoundException('Persona no encontrada');
        }
        return this.mapToDto(entity);
    }

    async update(
        id: number,
        dto: UpdatePersonaDto,
    ): Promise<PersonaResponseDto> {
        await this.findOne(id);
        const data = cleanDto(dto);
        try {
            const updated = await this.prismaModel.update({
                where: { id_persona: id },
                data,
            });
            return this.mapToDto(updated);
        } catch (error) {
            throw new NotFoundException('Persona no encontrada');
        }
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        try {
            await this.prismaModel.delete({
                where: { id_persona: id },
            });
        } catch (error) {
            throw new NotFoundException('Persona no encontrada');
        }
    }

    buildSearchQuery(search: string) {
        return {};
    }
    mapToDto(entity: any): PersonaResponseDto {
        return {
            idPersona: entity.id_persona,
            nombre: entity.nombre,
            dni: entity.dni,
            telefono: entity.telefono,
            correo: entity.correo,
        };
    }
}