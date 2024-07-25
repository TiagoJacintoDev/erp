import { Router } from 'express';

import { userRouter } from '../../../modules/users/http/user.router';

const v1Router = Router();

v1Router.use('/users', userRouter);

export { v1Router };
