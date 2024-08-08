import { err, ok, type Result } from '@sms/shared/src/core/Result';
import { type ValidationError } from '@sms/shared/src/domain/errors/ValidationError';

import { type UseCase } from '../../../../shared/core/UseCase';
import { type User } from '../../domain/user';
import { UserEmail } from '../../domain/user-email';
import { type UserRepository } from '../../repositories/user/user.repository';
import { type GetUserByEmailDTO } from './getUserByEmail.dto';
import { GetUserByEmailErrors } from './getUserByEmail.errors';

type Response = Result<User, GetUserByEmailErrors.UserNotFound | ValidationError>;

export class GetUserByEmailUseCase implements UseCase<GetUserByEmailDTO, Response> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: GetUserByEmailDTO): Promise<Response> {
    const emailOrError = UserEmail.create(dto.email);

    if (emailOrError.isErr()) {
      return err(emailOrError.error);
    }

    const email = emailOrError.value;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return err(new GetUserByEmailErrors.UserNotFound(dto.email));
    }

    return ok(user);
  }
}
