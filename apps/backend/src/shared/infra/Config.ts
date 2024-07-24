type Environment = 'development' | 'test' | 'production' | undefined;

type Script = 'test:unit' | 'test:e2e' | 'start:dev' | 'start:prod' | 'start:infra';

export class Config {
  private readonly _env: Environment;
  private readonly _script: Script;

  constructor(script: Script) {
    this._env = (process.env.NODE_ENV as Environment) ?? 'development';
    this._script = script;
  }

  get env() {
    return this._env;
  }

  get script() {
    return this._script;
  }
}
