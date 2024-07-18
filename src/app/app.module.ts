import { Module } from '@nestjs/common';
import { LoggerModule } from '@/shared/logger/infrastructure/logger.module';
import { UserModule } from '@/contexts/users/infrastructure/user.module';
import { EnvModule } from '@/contexts/shared/env/infrastructure/env.module';

@Module({
  imports: [EnvModule, LoggerModule, UserModule],
})
export class AppModule {}
