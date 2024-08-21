import { Router } from 'express';

import { userRouter } from '../../../modules/users/http/user.router';

const v1Router = Router();

v1Router.use('/users', userRouter);

v1Router.get('/health', (_req, res) => {
  res.send({
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  });
});

export { v1Router };
