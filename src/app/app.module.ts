import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@/shared/logger/infrastructure/logger.module';
import { UserModule } from '@/contexts/users/infrastructure/user.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),

    UserModule,
  ],
})
export class AppModule {}
