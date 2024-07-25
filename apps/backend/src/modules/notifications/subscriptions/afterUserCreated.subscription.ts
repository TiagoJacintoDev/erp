import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { SubscriptionHandler } from '../../../shared/domain/events/SubscriptionHandler';
import { UserCreatedEvent } from '../../users/domain/events/userCreated.event';
import { type SendEmailUseCase } from '../useCases/sendEmail/sendEmail.use-case';

export class AfterUserCreated extends SubscriptionHandler {
  constructor(private readonly sendEmail: SendEmailUseCase) {
    super();
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreated.bind(this), UserCreatedEvent.name);
  }

  private async onUserCreated(event: UserCreatedEvent) {
    await this.sendEmail
      .execute({
        to: event.user.email.value,
        subject: 'Welcome',
        text: 'Welcome to our platform',
      })
      .then(() =>
        this.logEvent({
          event: 'UserCreated',
          success: true,
          executedUseCase: 'SendEmail',
        }),
      );
  }
}
