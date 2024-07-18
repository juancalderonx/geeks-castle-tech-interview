import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestLoggerService } from '@/contexts/shared/logger/infrastructure/nestjs.logger-service';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@/shared/logger/domain';

async function main() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(NestLoggerService));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const logger = app.get(Logger);

  await app.listen(3000);

  logger.info(`App is ready and listening on port ${3000} 🚀`);
}
main();
