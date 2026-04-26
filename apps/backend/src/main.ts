import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Restrict CORS to known origins in production
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.FRONTEND_URL || 'http://localhost:3000',
    ],
    credentials: true,
  });

  // Auto-validate all incoming request bodies
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // Strip unknown properties
      forbidNonWhitelisted: false,
      transform: true,       // Auto-transform types (string -> number etc.)
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
  console.log(`✅ Swahit Backend running on port ${process.env.PORT ?? 3001}`);
}
bootstrap();
