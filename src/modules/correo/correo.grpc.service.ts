import { Controller, UseFilters } from "@nestjs/common";
import { CorreoService } from "./correo.service";
import { toCamelCase, toSnakeCase } from "src/shared/transformers/grpc.transformer";
import { GrpcExceptionFilter } from "src/shared/filters/grpc-exception.filter";
import { GrpcMethod } from "@nestjs/microservices";


@UseFilters(GrpcExceptionFilter)
@Controller()
export class CorreoGrpcService {
    constructor(private readonly correoService: CorreoService) {}

    @GrpcMethod('CorreoService', 'CreateCorreo')
    async createCorreo(data: any){
        const dto = toSnakeCase(data);
        const correo = await this.correoService.create(dto);
        return{
            success: true,
            message: 'Correo creado exitosamente',
            data: toCamelCase(correo)
        };
    }

    @GrpcMethod('CorreoService', 'FindAllCorreo')
    async findAllCorreo(params:{
        page?: number;
        limit?: number;
        search?: string;
    }){
        const { page = 1, limit = 10, search = '' } = params || {};
        const result = await this.correoService.findAll(
            Number(page),
            Number(limit),
            search
        );
        return{
            success: true,
            message: 'Correos obtenidos exitosamente',
            data: toCamelCase(result.data),
            meta: result.meta?.total || 0,
        };
    }

    @GrpcMethod('CorreoService', 'FindOneCorreo')
    async findOneCorreo(data:{idCorreo: number}){
        const correo = await this.correoService.findOne(data.idCorreo);
        return{
            success: true,
            message: 'Correo obtenido exitosamente',
            data: toCamelCase(correo)
        };
    }

    @GrpcMethod('CorreoService', 'UpdateCorreo')
    async updateCorreo(data:any){

        const id = data.idCorreo;
        if (!id) throw new Error('ID es requerido');

        const cleanData = {};
        for (const key in data) {
            if (!key.startsWith('_') && key !== 'idCorreo') {
                cleanData[key] = data[key];
            }
        }

        const dto = {
            ...toSnakeCase(cleanData),
        };

        const correo = await this.correoService.update(id, dto);
        return{
            success: true,
            message: 'Correo actualizado exitosamente',
            data: toCamelCase(correo)
        };
    }

    @GrpcMethod('CorreoService', 'DeleteCorreo')
    async deleteCorreo(data:{idCorreo: number}){
        console.log(data.idCorreo);
        const correo = await this.correoService.remove(data.idCorreo);
        return{
            success: true,
            message: 'Correo eliminado exitosamente',
            data: toCamelCase(correo)
        };
    }
}