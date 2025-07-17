import { Controller, UseFilters } from "@nestjs/common";
import { DestinoService } from "./destino.service";
import { toCamelCase, toSnakeCase } from "src/shared/transformers/grpc.transformer";
import { GrpcExceptionFilter } from "src/shared/filters/grpc-exception.filter";
import { GrpcMethod } from "@nestjs/microservices";


@UseFilters(GrpcExceptionFilter)
@Controller()
export class DestinoGrpcService {
    constructor(private readonly destinoService: DestinoService) {}

    @GrpcMethod('DestinoService', 'CreateDestino')
    async createDestino(data: any){
        const dto = toSnakeCase(data);
        const destino = await this.destinoService.create(dto);
        return{
            success: true,
            message: 'Destino creado exitosamente',
            data: toCamelCase(destino)
        };
    }

    @GrpcMethod('DestinoService', 'FindAllDestino')
    async findAllDestino(params:{
        page?: number;
        limit?: number;
        search?: string;
    }){
        const { page = 1, limit = 10, search = '' } = params || {};
        const result = await this.destinoService.findAll(
            Number(page),
            Number(limit),
            search
        );

        return{
            success: true,
            message: 'Destinos obtenidos exitosamente',
            data: result.data.map((item: any) => toCamelCase(item)),
            meta: result.meta?.total || 0,
        };
    }

    @GrpcMethod('DestinoService', 'FindOneDestino')
    async findOneDestino(data:{idDestino: number}){
        const destino = await this.destinoService.findOne(data.idDestino);
        return{
            success: true,
            message: 'Destino obtenido exitosamente',
            data: toCamelCase(destino)
        };
    }

    @GrpcMethod('DestinoService', 'UpdateDestino')
    async updateDestino(data:any){

        const id = data.idDestino;
        if (!id) throw new Error('ID es requerido');

        const cleanData = {};
        for (const key in data) {
            if (!key.startsWith('_') && key !== 'idDestino') {
                cleanData[key] = data[key];
            }
        }

        const dto = {
            ...toSnakeCase(cleanData),
        };

        const destino = await this.destinoService.update(id, dto);
        return{
            success: true,
            message: 'Destino actualizado exitosamente',
            data: toCamelCase(destino)
        };
    }

    @GrpcMethod('DestinoService', 'DeleteDestino')
    async deleteDestino(data:{idDestino: number}){
        console.log(data.idDestino);
        const destino = await this.destinoService.remove(data.idDestino);
        return{
            success: true,
            message: 'Destino eliminado exitosamente',
            data: toCamelCase(destino)
        };
    }
}