import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: Move to some separate constants CORSOptions or just use app.enableCors()
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // If you need cookies or HTTP auth
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  });

  // TODO: Port should be defined from env file

  // TODO: Add global filters, validation pipes, global prefix and versioning
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Убирает лишние поля, которые не описаны в DTO
      forbidNonWhitelisted: true, // Ошибка, если есть поля, не описанные в DTO
      transform: true, // Преобразует типы данных автоматически
    }),
  );

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);
}

bootstrap();
