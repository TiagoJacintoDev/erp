import { userRepository } from '../../repositories';
import { SignupController } from './signup.controller';
import { SignupUseCase } from './signup.use-case';

const signupUseCase = new SignupUseCase(userRepository);
const signupController = new SignupController(signupUseCase);

export { signupUseCase, signupController };
