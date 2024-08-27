import { type UseCase } from '@/src/shared/core/UseCase';
import { err, ok, Result } from '@sms/shared/src/core/Result';
import { type ValidationError } from '@sms/shared/src/domain/errors/ValidationError';
import { type SignupDTO } from '@sms/shared/src/modules/users/signup/signup.dto';

import { User } from '../../domain/user';
import { UserEmail } from '../../domain/user-email';
import { UserPassword } from '../../domain/user-password';
import { type UserRepository } from '../../repositories/user/user.repository';
import { SignupErrors } from './signup.errors';

type Response = Result<Nil, SignupErrors.EmailAlreadyExists | ValidationError>;

export class SignupUseCase implements UseCase<SignupDTO, Response> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: SignupDTO): Promise<Response> {
    const emailOrError = UserEmail.create(dto.email);

    const passwordOrError = UserPassword.create({ value: dto.password });

    const payloadResult = Result.combine([emailOrError, passwordOrError]);

    if (payloadResult.isErr()) {
      return err(payloadResult.error);
    }

    const email = emailOrError.unwrapValue();
    const password = passwordOrError.unwrapValue();

    const emailAlreadyExists = Boolean(await this.userRepository.findByEmail(email));

    if (emailAlreadyExists) {
      return err(new SignupErrors.EmailAlreadyExists(email.value));
    }

    const user = User.create({
      email,
      password,
    });

    await this.userRepository.save(user);

    return ok(null);
  }
}
