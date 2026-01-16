import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './infrastructure/http/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 Exception Filter GLOBAL
  app.useGlobalFilters(new GlobalExceptionFilter());

  // 🔐 Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 📘 Swagger
  const config = new DocumentBuilder()
    .setTitle('Backend Hexagonal API')
    .setDescription('API com NestJS + Arquitetura Hexagonal')
    .setVersion('1.0.0')
    .addTag('Users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`🚀Server listening on http://localhost:${port}`);
}

bootstrap();
