import { sendEmailUseCase } from '../useCases/sendEmail';
import { AfterUserCreated } from './afterUserCreated.subscription';

new AfterUserCreated(sendEmailUseCase);
