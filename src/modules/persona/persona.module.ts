import { Module } from "@nestjs/common";
import { PersonaService } from "./persona.service";
import { PersonaController } from "./persona.controller";
import { PrismaService } from "../../shared/services/prisma.service";
import { PersonaGrpcService } from "./persona.grpc.service";

@Module({
    controllers: [PersonaController, PersonaGrpcService],
    providers: [PersonaService, PrismaService],
    exports: [PersonaService],
})
export class PersonaModule {}