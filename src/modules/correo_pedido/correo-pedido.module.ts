import { Module } from "@nestjs/common";
import { CorreoPedidoService } from "./correo-pedido.service";
import { CorreoPedidoController } from "./correo-pedido.controller";
import { PrismaService } from "../../shared/services/prisma.service";
import { CorreoPedidoGrpcService } from "./correo-pedido.grpc.service";

@Module({
    controllers: [CorreoPedidoController, CorreoPedidoGrpcService],
    providers: [CorreoPedidoService, PrismaService],
    exports: [CorreoPedidoService],
})
export class CorreoPedidoModule {}