import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';
 
async function bootstrap() {
 
  const logger = new Logger('Bootstrap');
 
  const app = await NestFactory.create(AppModule);
 
  app.enableCors();
 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
 
  app.setGlobalPrefix('api');
 
  const config = new DocumentBuilder()
    .setTitle('Correo Service API')
    .setDescription('API para gestión de correos')
    .setVersion('1.0')
    .addTag('correo')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
 
  // Verificar la ruta del proto
  const protoPath = join(__dirname, '../proto/correo-services.proto');
  console.log('PROTO PATH:', protoPath);
  console.log('PROTO FILE EXISTS:', require('fs').existsSync(protoPath));
 
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'correo',
      protoPath: protoPath,
      url: process.env.GRPC_URL || '0.0.0.0:5001',
      loader: {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
      }
    },
  });
 
  await app.startAllMicroservices();
 
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
 
  logger.log(`🚀 Servidor HTTP iniciado en: ${await app.getUrl()}`);
  logger.log(`📚 Documentación Swagger disponible en: ${await app.getUrl()}/api/docs`);
  logger.log(`🔌 Servidor gRPC iniciado en: ${process.env.GRPC_URL || '0.0.0.0:5001'}`);
}
 
bootstrap();