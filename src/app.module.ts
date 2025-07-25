import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Filtros de excepciones
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { CorreoModule } from './modules/correo/correo.module';
import { DestinoModule } from './modules/destino/destino.module';
import { CorreoPedidoModule } from './modules/correo_pedido/correo-pedido.module';
import { PersonaModule } from './modules/persona/persona.module';
import { EmpresaModule } from './modules/empresa/empresa.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CorreoModule,
    DestinoModule,
    CorreoPedidoModule,
    PersonaModule,
    EmpresaModule,
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule {}