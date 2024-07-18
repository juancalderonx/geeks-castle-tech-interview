import { Config } from '../domain/config.interface';
import { Envs } from './env.config';
import { Injectable } from '@/shared/dependency-injection/injectable';

@Injectable()
export class EnvironmentConfigService implements Config {
  get(key: keyof typeof Envs.ENVIRONMENT): string | number | boolean {
    return Envs.ENVIRONMENT[key];
  }
}
