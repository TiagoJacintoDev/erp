import { type Nil } from '@sms/shared/src/core/Nil';

import { err, ok, type Result } from '../../../../shared/core/Result';
import { type UseCase } from '../../../../shared/core/UseCase';
import { type ValidationError } from '../../../../shared/domain/errors/ValidationError';
import { User } from '../../domain/user';
import { UserEmail } from '../../domain/user-email';
import { type UserRepository } from '../../repositories/user/user.repository';
import { type SignupDTO } from './signup.dto';
import { SignupErrors } from './signup.errors';

type Response = Result<Nil, SignupErrors.EmailAlreadyExists | ValidationError>;

export class SignupUseCase implements UseCase<SignupDTO, Response> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: SignupDTO): Promise<Response> {
    const emailOrError = UserEmail.create(dto.email);

    if (emailOrError.isErr()) {
      return err(emailOrError.error);
    }

    const email = emailOrError.unwrapValue();

    const emailAlreadyExists = Boolean(await this.userRepository.findByEmail(email));

    if (emailAlreadyExists) {
      return err(new SignupErrors.EmailAlreadyExists(email.value));
    }

    const user = User.create({
      email,
    });

    await this.userRepository.save(user);

    return ok(null);
  }
}
