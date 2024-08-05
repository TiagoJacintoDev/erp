import { Router } from 'express';

import { signupController } from '../useCases/signup';

const userRouter = Router();

userRouter.post('/', (req, res, next) => signupController.execute(req, res, next));

export { userRouter };
