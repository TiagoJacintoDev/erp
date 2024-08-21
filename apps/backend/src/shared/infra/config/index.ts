import { type Maybe } from '@sms/shared/src/core/Maybe';
import { z } from 'zod';

import { getMultipleAzureKeyVaultSecretsValue } from '../../env/production/getAzureKeyVaultSecretsValue';

export type DevelopmentEnvVariables = Record<string, never>;

export type TestEnvVariables = Record<string, never>;

export type ProductionEnvVariables = {
  MAIL_SENDER_SERVICE: string;
  MAIL_SENDER_EMAIL: string;
  MAIL_SENDER_AUTH_EMAIL: string;
  MAIL_SENDER_AUTH_PASSWORD: string;
  DATABASE_URL: `postgres://${string}:${string}@${string}:5432/${string}?schema=public&sslmode=require`;
};

export type DevelopmentConfig = {
  shouldBuildFakeDependency: true;
  environment: 'development';
  env: DevelopmentEnvVariables;
};

export type TestConfig = {
  shouldBuildFakeDependency: true;
  environment: 'test';
  env: TestEnvVariables;
};

export type ProductionConfig = {
  shouldBuildFakeDependency: false;
  environment: 'production';
  env: ProductionEnvVariables;
};

export type Config = DevelopmentConfig | TestConfig | ProductionConfig;

export type Environment = 'development' | 'test' | 'production' | undefined;

const environment = (process.env.NODE_ENV as Environment) || 'development';

console.log('Environment:', environment);

let config: Config;

switch (environment) {
  case 'development': {
    config = {
      shouldBuildFakeDependency: true,
      environment,
      env: createEnv({
        schema: z.object({}),
        runtimeEnv: {},
      }),
    };
    break;
  }
  case 'production': {
    const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME } = z
      .object({
        DATABASE_USER: z.string(),
        DATABASE_PASSWORD: z.string(),
        DATABASE_HOST: z.string(),
        DATABASE_NAME: z.string(),
      })
      .parse(
        await getMultipleAzureKeyVaultSecretsValue({
          DATABASE_HOST: 'database_host',
          DATABASE_USER: 'database_username',
          DATABASE_PASSWORD: 'database_password',
          DATABASE_NAME: 'database_name',
        }),
      );

    const DATABASE_URL =
      `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:5432/${DATABASE_NAME}?schema=public&sslmode=require` as const;

    config = {
      shouldBuildFakeDependency: false,
      environment,
      env: createEnv({
        schema: z.object({
          MAIL_SENDER_SERVICE: z.string(),
          MAIL_SENDER_EMAIL: z.string().email(),
          MAIL_SENDER_AUTH_EMAIL: z.string(),
          MAIL_SENDER_AUTH_PASSWORD: z.string(),
          DATABASE_URL: z.literal(DATABASE_URL),
        }),
        runtimeEnv: {
          MAIL_SENDER_SERVICE: process.env.MAIL_SENDER_SERVICE,
          MAIL_SENDER_EMAIL: process.env.MAIL_SENDER_EMAIL,
          MAIL_SENDER_AUTH_EMAIL: process.env.MAIL_SENDER_AUTH_EMAIL,
          MAIL_SENDER_AUTH_PASSWORD: process.env.MAIL_SENDER_AUTH_PASSWORD,
          DATABASE_URL,
        },
      }),
    };
    break;
  }
  case 'test': {
    config = {
      shouldBuildFakeDependency: true,
      environment,
      env: createEnv({
        schema: z.object({}),
        runtimeEnv: {},
      }),
    };
    break;
  }
}

export { config };

type CreateEnvOptions<T extends z.AnyZodObject> = {
  schema: T;
  runtimeEnv: Record<keyof z.infer<T>, Maybe<string>>;
};

function createEnv<T extends z.AnyZodObject>(opts: CreateEnvOptions<T>) {
  const env = opts.schema.parse(opts.runtimeEnv) as z.infer<T>;

  return env;
}
