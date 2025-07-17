import { Controller, UseFilters } from "@nestjs/common";
import { PersonaService } from "./persona.service";
import { toCamelCase, toSnakeCase } from "src/shared/transformers/grpc.transformer";
import { GrpcExceptionFilter } from "src/shared/filters/grpc-exception.filter";
import { GrpcMethod } from "@nestjs/microservices";

@UseFilters(GrpcExceptionFilter)
@Controller()
export class PersonaGrpcService {
    constructor(private readonly personaService: PersonaService) {}

    @GrpcMethod('PersonaService', 'CreatePersona')
    async createPersona(data: any){
        const dto = toSnakeCase(data);
        const persona = await this.personaService.create(dto);
        return{
            success: true,
            message: 'Persona creada exitosamente',
            data: toCamelCase(persona)
        };
    }

    @GrpcMethod('PersonaService', 'FindAllPersona')
    async findAllPersona(params:{
        page?: number;
        limit?: number;
        search?: string;
    }){
        const { page = 1, limit = 10, search = '' } = params || {};
        const result = await this.personaService.findAll(
            Number(page),
            Number(limit),
            search
        );
        return{
            success: true,
            message: 'Personas obtenidas exitosamente',
            data: toCamelCase(result.data),
            meta: result.meta?.total || 0,
        };
    }

    @GrpcMethod('PersonaService', 'FindOnePersona')
    async findOnePersona(data:{idPersona: number}){
        const persona = await this.personaService.findOne(data.idPersona);
        return{
            success: true,
            message: 'Persona obtenida exitosamente',
            data: toCamelCase(persona)
        };
    }

    @GrpcMethod('PersonaService', 'UpdatePersona')
    async updatePersona(data:any){

        const id = data.idPersona;
        if (!id) throw new Error('ID es requerido');

        const cleanData = {};
        for (const key in data) {
            if (!key.startsWith('_') && key !== 'idPersona') {
                cleanData[key] = data[key];
            }
        }

        const dto = {
            ...toSnakeCase(cleanData),
        };

        const persona = await this.personaService.update(id, dto);
        return{
            success: true,
            message: 'Persona actualizada exitosamente',
            data: toCamelCase(persona)
        };
    }

    @GrpcMethod('PersonaService', 'DeletePersona')
    async deletePersona(data:{idPersona: number}){
        console.log(data.idPersona);
        const persona = await this.personaService.remove(data.idPersona);
        return{
            success: true,
            message: 'Persona eliminada exitosamente',
            data: toCamelCase(persona)
        };
    }
}