import { Router } from 'express';

const miscRouter = Router();

miscRouter.get('/health', (_req, res) => {
  res.send({
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  });
});

export { miscRouter };
