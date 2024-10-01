import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // If you need cookies or HTTP auth
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  });
  await app.listen(3008);
}
bootstrap();
