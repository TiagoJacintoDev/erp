import { type EmailService } from '../email.service';

export class FakeEmailService implements EmailService {
  async sendEmail(): Promise<void> {}
}
