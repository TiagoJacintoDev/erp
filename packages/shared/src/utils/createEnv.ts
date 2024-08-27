import { type z } from 'zod';

type CreateEnvOptions<T extends z.AnyZodObject> = {
  schema: T;
  runtimeEnv: Record<string, unknown>;
};

export function createEnv<T extends z.AnyZodObject>(opts: CreateEnvOptions<T>) {
  const env = opts.schema.parse(opts.runtimeEnv) as z.infer<T>;

  return env;
}
