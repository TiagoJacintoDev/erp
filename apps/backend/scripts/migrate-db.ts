import { execSync } from 'child_process';

import { config, type ProductionConfig } from '../src/shared/infra/config';

execSync(
  `npx cross-env DATABASE_URL="${(config as ProductionConfig).env.DATABASE_URL}" npx prisma migrate deploy`,
  {
    stdio: 'inherit',
  },
);
