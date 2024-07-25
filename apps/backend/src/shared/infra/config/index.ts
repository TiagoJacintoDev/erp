type Environment = 'development' | 'test' | 'production' | undefined;

type Script = 'test:unit' | 'test:e2e' | 'start:dev' | 'start:prod' | 'start:infra' | undefined;

export type Config = {
  env: Environment;
  script: Script;
  shouldBuildFakeDependency(): boolean;
};

const config: Config = {
  env: (process.env.NODE_ENV as Environment) || 'development',
  script: (process.env.SCRIPT as Script) || 'start:dev',
  shouldBuildFakeDependency() {
    return this.env === 'test' || this.script === 'start:dev';
  },
};

export { config };
