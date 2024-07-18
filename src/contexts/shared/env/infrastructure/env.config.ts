import { z } from 'zod';
import 'dotenv/config';

interface EnvVars {
  PORT: number;
}

const envsSchema = z.object({
  PORT: z.coerce
    .number()
    .positive()
    .max(65536, `Port should be >= 0 and < 65536`)
    .default(3000),
});

const envVars = envsSchema.parse(process.env) as EnvVars;

export const Envs = {
  ENVIRONMENT: {
    PORT: envVars.PORT,
  },
};
