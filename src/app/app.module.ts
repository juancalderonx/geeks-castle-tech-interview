import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@/shared/logger/infrastructure/logger.module';
import { UserModule } from '@/contexts/users/infrastructure/user.module';
import { CustomerModule } from '@/contexts/customers/infrastructure/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    UserModule,
    CustomerModule,
  ],
})
export class AppModule {}
