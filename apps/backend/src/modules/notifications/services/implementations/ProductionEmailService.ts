import { type ProductionEnvVariables } from '@/src/shared/infra/config';
import nodemailer from 'nodemailer';

import { type EmailService, type SendEmailInput } from '../email.service';

export class ProductionEmailService implements EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly env: ProductionEnvVariables) {
    this.transporter = nodemailer.createTransport({
      service: env.MAIL_SENDER_SERVICE,
      auth: {
        user: env.MAIL_SENDER_AUTH_EMAIL,
        pass: env.MAIL_SENDER_AUTH_PASSWORD,
      },
    });
  }

  async sendEmail(input: SendEmailInput): Promise<void> {
    await this.transporter.sendMail({
      from: this.env.MAIL_SENDER_EMAIL,
      ...input,
    });
  }
}
