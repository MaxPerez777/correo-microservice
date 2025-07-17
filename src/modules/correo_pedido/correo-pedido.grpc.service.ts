import { Controller, UseFilters } from "@nestjs/common";
import { CorreoPedidoService } from "./correo-pedido.service";
import { toCamelCase, toSnakeCase } from "src/shared/transformers/grpc.transformer";
import { GrpcExceptionFilter } from "src/shared/filters/grpc-exception.filter";
import { GrpcMethod } from "@nestjs/microservices";


@UseFilters(GrpcExceptionFilter)
@Controller()
export class CorreoPedidoGrpcService {
    constructor(private readonly correoPedidoService: CorreoPedidoService) {}

    @GrpcMethod('CorreoPedidoService', 'CreateCorreoPedido')
    async createCorreoPedido(data: any){
        const dto = toSnakeCase(data);
        const correoPedido = await this.correoPedidoService.create(dto);
        return{
            success: true,
            message: 'Correo pedido creado exitosamente',
            data: toCamelCase(correoPedido)
        };
    }

    @GrpcMethod('CorreoPedidoService', 'FindAllCorreoPedido')
    async findAllCorreoPedido(params:{
        page?: number;
        limit?: number;
        search?: string;
    }){
        const { page = 1, limit = 10, search = '' } = params || {};
        const result = await this.correoPedidoService.findAll(
            Number(page),
            Number(limit),
            search
        );
        return{
            success: true,
            message: 'Correos pedidos obtenidos exitosamente',
            data: toCamelCase(result.data),
            meta: result.meta?.total || 0,
        };
    }

    @GrpcMethod('CorreoPedidoService', 'FindOneCorreoPedido')
    async findOneCorreoPedido(data:{idCorreoPedido: number}){
        const correoPedido = await this.correoPedidoService.findOne(data.idCorreoPedido);
        return{
            success: true,
            message: 'Correo pedido obtenido exitosamente',
            data: toCamelCase(correoPedido)
        };
    }

    @GrpcMethod('CorreoPedidoService', 'UpdateCorreoPedido')
    async updateCorreoPedido(data:any){

        const id = data.idCorreoPedido;
        if (!id) throw new Error('ID es requerido');

        const cleanData = {};
        for (const key in data) {
            if (!key.startsWith('_') && key !== 'idCorreoPedido') {
                cleanData[key] = data[key];
            }
        }

        const dto = {
            ...toSnakeCase(cleanData),
        };

        const correoPedido = await this.correoPedidoService.update(id, dto);
        return{
            success: true,
            message: 'Correo pedido actualizado exitosamente',
            data: toCamelCase(correoPedido)
        };
    }

    @GrpcMethod('CorreoPedidoService', 'DeleteCorreoPedido')
    async deleteCorreoPedido(data:{idCorreoPedido: number}){
        console.log(data.idCorreoPedido);
        const correoPedido = await this.correoPedidoService.remove(data.idCorreoPedido);
        return{
            success: true,
            message: 'Correo pedido eliminado exitosamente',
            data: toCamelCase(correoPedido)
        };
    }
}