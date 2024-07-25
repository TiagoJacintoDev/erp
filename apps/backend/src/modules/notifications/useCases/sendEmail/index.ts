import { emailService } from '../../services';
import { SendEmailUseCase } from './sendEmail.use-case';

const sendEmailUseCase = new SendEmailUseCase(emailService);

export { sendEmailUseCase };
