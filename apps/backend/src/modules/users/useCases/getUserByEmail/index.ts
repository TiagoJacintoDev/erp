import { userRepository } from '../../repositories';
import { GetUserByEmailUseCase } from './getUserByEmail.use-case';

const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);

export { getUserByEmailUseCase };
