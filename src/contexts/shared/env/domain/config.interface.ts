export abstract class Config {
  abstract get(key: string): string | number | boolean;
}
