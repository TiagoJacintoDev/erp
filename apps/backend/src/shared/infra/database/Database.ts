import { PrismaClient } from '@prisma/client';

import { type ProductionConfig } from '../config';

export class Database {
  private readonly connection: PrismaClient;

  constructor(config: ProductionConfig) {
    this.connection = new PrismaClient({
      log: ['error'],
      datasourceUrl: config.env.DATABASE_URL,
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
