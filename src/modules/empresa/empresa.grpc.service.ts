import { Controller, UseFilters } from "@nestjs/common";
import { EmpresaService } from "./empresa.service";
import { toCamelCase, toSnakeCase } from "src/shared/transformers/grpc.transformer";
import { GrpcExceptionFilter } from "src/shared/filters/grpc-exception.filter";
import { GrpcMethod } from "@nestjs/microservices";


@UseFilters(GrpcExceptionFilter)
@Controller()
export class EmpresaGrpcService {
    constructor(private readonly empresaService: EmpresaService) {}
    

    @GrpcMethod('EmpresaService', 'CreateEmpresa')
    async createEmpresa(data: any){
        const dto = toSnakeCase(data);
        const empresa = await this.empresaService.create(dto);
        return{
            success: true,
            message: 'Empresa creada exitosamente',
            data: toCamelCase(empresa)
        };
    }

    @GrpcMethod('EmpresaService', 'FindAllEmpresa')
    async findAllEmpresa(params:{
        page?: number;
        limit?: number;
        search?: string;
    }){
        const { page = 1, limit = 10, search = '' } = params || {};
        const result = await this.empresaService.findAll(
            Number(page),
            Number(limit),
            search
        );
        return{
            success: true,
            message: 'Empresas obtenidas exitosamente',
            data: toCamelCase(result.data),
            meta: result.meta?.total || 0,
        };
    }

    @GrpcMethod('EmpresaService', 'FindOneEmpresa')
    async findOneEmpresa(data:{idEmpresa: number}){
        const empresa = await this.empresaService.findOne(data.idEmpresa);
        return{
            success: true,
            message: 'Empresa obtenida exitosamente',
            data: toCamelCase(empresa)
        };
    }

    @GrpcMethod('EmpresaService', 'UpdateEmpresa')
    async updateEmpresa(data:any){

        const id = data.idEmpresa;
        if (!id) throw new Error('ID es requerido');

        const cleanData = {};
        for (const key in data) {
            if (!key.startsWith('_') && key !== 'idEmpresa') {
                cleanData[key] = data[key];
            }
        }

        const dto = {
            ...toSnakeCase(cleanData),
        };

        const empresa = await this.empresaService.update(id, dto);
        return{
            success: true,
            message: 'Empresa actualizada exitosamente',
            data: toCamelCase(empresa)
        };
    }

    @GrpcMethod('EmpresaService', 'DeleteEmpresa')
    async deleteEmpresa(data:{idEmpresa: number}){
        console.log(data.idEmpresa);
        const empresa = await this.empresaService.remove(data.idEmpresa);
        return{
            success: true,
            message: 'Empresa eliminada exitosamente',
            data: toCamelCase(empresa)
        };
    }
}