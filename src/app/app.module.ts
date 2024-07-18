import { Module } from '@nestjs/common';
import { LoggerModule } from '@/shared/logger/infrastructure/logger.module';
import { UserModule } from '@/contexts/users/infrastructure/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    UserModule,
  ],
})
export class AppModule {}
