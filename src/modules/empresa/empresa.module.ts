import { Module } from "@nestjs/common";
import { EmpresaService } from "./empresa.service";
import { EmpresaController } from "./empresa.controller";
import { EmpresaGrpcService } from "./empresa.grpc.service";
import { PrismaService } from "../../shared/services/prisma.service";

@Module({
    controllers: [EmpresaController, EmpresaGrpcService],
    providers: [EmpresaService, PrismaService],
    exports: [EmpresaService],
})
export class EmpresaModule {}