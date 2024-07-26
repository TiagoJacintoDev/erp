import bcrypt from 'bcrypt';

import { type PasswordHasher } from '../passwordHasher.service';

export class BCryptPasswordHasher implements PasswordHasher {
  private static readonly saltRounds = 10;

  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, BCryptPasswordHasher.saltRounds);
  }

  compare(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
  }
}
