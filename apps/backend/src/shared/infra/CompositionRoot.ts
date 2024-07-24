import { v1Router } from './apis/v1';
import { type Config } from './Config';
import { Database } from './database/Database';
import { WebServer } from './http/WebServer';

export class CompositionRoot {
  private static readonly instance?: CompositionRoot;

  private readonly database: Database;
  private readonly config: Config;
  private readonly webServer: WebServer;

  static getInstance(config: Config) {
    if (!CompositionRoot.instance) return new CompositionRoot(config);

    return CompositionRoot.instance;
  }

  private constructor(config: Config) {
    this.config = config;
    this.database = new Database(config);
    this.webServer = new WebServer({
      port: 3000,
      prefix: '/api',
      router: v1Router,
    });
  }

  get repositories() {
    return {};
  }

  getDatabase() {
    return this.database;
  }

  getWebServer() {
    return this.webServer;
  }
}
