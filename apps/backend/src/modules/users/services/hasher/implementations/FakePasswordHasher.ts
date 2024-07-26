import { type PasswordHasher } from '../passwordHasher.service';

export class FakePasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return password;
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return password === hashedPassword;
  }
}
