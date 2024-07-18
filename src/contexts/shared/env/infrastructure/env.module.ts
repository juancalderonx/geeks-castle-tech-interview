import { Module } from '@nestjs/common';
import { Config } from '../domain/config.interface';
import { EnvironmentConfigService } from './env-config.service';

@Module({
  providers: [
    {
      provide: Config,
      useClass: EnvironmentConfigService,
    },
  ],
  exports: [Config],
})
export class EnvModule {}
