import { checkDocker } from '@sms/shared/src/scripts/checkDocker';
import { execSync } from 'child_process';
import path from 'path';

import { logger } from './src/shared/infra/logging';

export function prepareDev(env = '.env.development'): void {
  logger.info(`Preparing dev environment using ${env}`);

  checkDocker();

  const packageRoot = path.resolve(__dirname);

  const execParams = {
    cwd: packageRoot,
    stdio: 'inherit',
  } as const;

  if (env === '.env.development') return;

  execSync('docker-compose up --build -d', execParams);
  execSync(`dotenv -e ${env} -- npm run prisma:generate:client`, execParams);
  execSync(`dotenv -e ${env} -- npm run migrate`, execParams);
}
