import dotenv from 'dotenv';
import path from 'path';

import { prepareDev } from '../../prepareDev';
import { logger } from '../../src/shared/infra/logging';

export default async (): Promise<void> => {
  prepareDev();

  const nodeEnv = process.env.NODE_ENV || 'development';

  const envPath = path.join(__dirname, `../../.env.${nodeEnv}`);

  logger.info('Reading env file', envPath);
  dotenv.config({ path: envPath });
};
