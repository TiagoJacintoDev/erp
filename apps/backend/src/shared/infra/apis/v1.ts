import { Router } from 'express';

import { miscRouter } from '../../../modules/misc/http/misc.router';
import { userRouter } from '../../../modules/users/http/user.router';

const v1Router = Router();

v1Router.use('/users', userRouter);

v1Router.use('/', miscRouter);

export { v1Router };
