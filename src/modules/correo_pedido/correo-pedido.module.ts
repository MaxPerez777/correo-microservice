import { Module } from "@nestjs/common";
import { CorreoPedidoService } from "./correo-pedido.service";
import { CorreoPedidoController } from "./correo-pedido.controller";
import { PrismaService } from "../../shared/services/prisma.service";

@Module({
    controllers: [CorreoPedidoController],
    providers: [CorreoPedidoService, PrismaService],
    exports: [CorreoPedidoService],
})
export class CorreoPedidoModule {}