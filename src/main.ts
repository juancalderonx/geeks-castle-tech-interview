import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestLoggerService } from '@/contexts/shared/logger/infrastructure/nestjs.logger-service';
import { Logger } from '@/shared/logger/domain';
import { AppModule } from './app/app.module';

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

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port);

  logger.info(`App is ready and listening on port ${port} 🚀`);
}
main().catch(handleError);

function handleError(error: unknown) {
  console.error(error);
  process.exit(1);
}

process.on('uncaughtException', handleError);
