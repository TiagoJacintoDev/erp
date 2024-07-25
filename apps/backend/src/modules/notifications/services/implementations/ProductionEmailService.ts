import nodemailer from 'nodemailer';

import { type EmailService, type SendEmailInput } from '../email.service';

export class ProductionEmailService implements EmailService {
  private readonly transporter = nodemailer.createTransport({
    service: process.env.MAIL_SENDER_SERVICE,
    auth: {
      user: process.env.MAIL_SENDER_AUTH_EMAIL,
      pass: process.env.MAIL_SENDER_AUTH_PASSWORD,
    },
  });

  async sendEmail(input: SendEmailInput): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.MAIL_SENDER_EMAIL,
      ...input,
    });
  }
}
