import { Module } from "@nestjs/common";
import { DestinoController } from "./destino.controller";
import { DestinoService } from "./destino.service";
import { DestinoGrpcService } from "./destino.grpc.service";
import { PrismaService } from "../../shared/services/prisma.service";

@Module({
    controllers: [DestinoController, DestinoGrpcService],
    providers: [DestinoService, PrismaService],
    exports: [DestinoService],
})
export class DestinoModule {}