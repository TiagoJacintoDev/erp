import { config } from '../../../shared/infra/config';
import { type EmailService } from './email.service';
import { FakeEmailService } from './implementations/FakeEmailService';
import { ProductionEmailService } from './implementations/ProductionEmailService';

let emailService: EmailService;

if (config.shouldBuildFakeDependency()) {
  emailService = new FakeEmailService();
} else {
  emailService = new ProductionEmailService();
}

export { emailService };
