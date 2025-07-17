import { Module } from "@nestjs/common";
import { CorreoService } from "./correo.service";
import { CorreoController } from "./correo.controller";
// import { CorreoGrpcService } from "./correo.grpc.service";
import { PrismaService } from "../../shared/services/prisma.service";

@Module({
    controllers: [CorreoController],
    providers: [CorreoService, PrismaService],
    exports: [CorreoService],
})
export class CorreoModule {}
