import { PrismaClient } from '@prisma/client';

import { type Config } from '../config';

export class Database {
  private readonly connection: PrismaClient;

  constructor(config: Config) {
    this.connection = new PrismaClient({
      log: config.env === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  getConnection() {
    return this.connection;
  }

  async connect() {
    await this.connection.$connect();
  }

  async disconnect() {
    await this.connection.$disconnect();
  }
}
