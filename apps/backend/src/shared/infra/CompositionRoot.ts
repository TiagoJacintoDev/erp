import { emailService } from '../../modules/notifications/services';
import { sendEmailUseCase } from '../../modules/notifications/useCases/sendEmail';
import { userRepository } from '../../modules/users/repositories';
import { deleteUserUseCase } from '../../modules/users/useCases/deleteUser';
import { getUserByEmailUseCase } from '../../modules/users/useCases/getUserByEmail';
import { signupUseCase } from '../../modules/users/useCases/signup';
import { v1Router } from './apis/v1';
import { type Config, config } from './config';
import { database } from './database';
import { type Database } from './database/Database';
import { WebServer } from './http/WebServer';

export class CompositionRoot {
  private static readonly instance?: CompositionRoot;

  private readonly database: Database;
  private readonly webServer: WebServer;
  private readonly config: Config;

  static getInstance() {
    if (!CompositionRoot.instance) return new CompositionRoot();

    return CompositionRoot.instance;
  }

  private constructor() {
    this.database = database;
    this.webServer = new WebServer({
      port: 3000,
      prefix: '/api/v1',
      router: v1Router,
    });
    this.config = config;
    console.log(`[CompositionRoot] Running in ${this.config.env} environment.`);

    console.log('[CompositionRoot] Setting up subscriptions...');
    this.setupSubscriptions();
    console.log('[CompositionRoot] Subscriptions setup complete.');
  }

  private setupSubscriptions() {
    void import('../../modules/notifications/subscriptions/index');
  }

  getApplication() {
    return {
      notifications: {
        repositories: {},
        useCases: {
          sendEmail: sendEmailUseCase,
        },
        services: {
          email: emailService,
        },
      },
      users: {
        repositories: {
          user: userRepository,
        },
        useCases: {
          signup: signupUseCase,
          getUserByEmail: getUserByEmailUseCase,
          deleteUser: deleteUserUseCase,
        },
      },
    };
  }

  getDatabase() {
    return this.database;
  }

  getWebServer() {
    return this.webServer;
  }
}
