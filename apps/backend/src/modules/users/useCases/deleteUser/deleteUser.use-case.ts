import { type UseCase } from '@/src/shared/core/UseCase';
import { err, ok, type Result } from '@erp/shared/src/core/Result';
import { type ValidationError } from '@erp/shared/src/domain/errors/ValidationError';

import { UserEmail } from '../../domain/user-email';
import { type UserRepository } from '../../repositories/user/user.repository';
import { type DeleteUserDTO } from './deleteUser.dto';
import { DeleteUserErrors } from './deleteUser.errors';

type Response = Result<Nil, ValidationError | DeleteUserErrors.UserNotFound>;

export class DeleteUserUseCase implements UseCase<DeleteUserDTO, Response> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: DeleteUserDTO): Promise<Response> {
    const emailOrError = UserEmail.create(request.email);

    if (emailOrError.isErr()) {
      return err(emailOrError.error);
    }

    const email = emailOrError.value;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return err(new DeleteUserErrors.UserNotFound(email.value));
    }

    return ok(null);
  }
}
