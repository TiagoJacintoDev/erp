import { Router } from 'express';

import { signupController } from '../useCases/signup';

const userRouter = Router();

userRouter.post('/', (req, res) => signupController.execute(req, res));

export { userRouter };
