import { createEnv } from '@erp/shared/src/utils/createEnv';
import { z } from 'zod';

export const config = {
  env: createEnv({
    schema: z.object({
      VITE_API_URL: z.string(),
    }),
    runtimeEnv: import.meta.env,
  }),
};
