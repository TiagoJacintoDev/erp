import { type AsyncMaybe } from '@sms/shared/src/core/Maybe';

import { type User } from '../../domain/user';
import { type UserEmail } from '../../domain/user-email';

export interface UserRepository {
  findByEmail(email: UserEmail): AsyncMaybe<User>;
  save(user: User): Promise<void>;
}
