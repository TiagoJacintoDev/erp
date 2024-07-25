import { userRepository } from '../../repositories';
import { DeleteUserUseCase } from './deleteUser.use-case';

const deleteUserUseCase = new DeleteUserUseCase(userRepository);

export { deleteUserUseCase };
