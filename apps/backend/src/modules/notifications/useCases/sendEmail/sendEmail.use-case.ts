import { type UseCase } from '../../../../shared/core/UseCase';
import { type EmailService } from '../../services/email.service';
import { type SendEmailDTO } from './sendEmail.dto';

export class SendEmailUseCase implements UseCase<SendEmailDTO, void> {
  constructor(private readonly emailService: EmailService) {}

  async execute(request: SendEmailDTO): Promise<void> {
    await this.emailService.sendEmail(request);
  }
}
