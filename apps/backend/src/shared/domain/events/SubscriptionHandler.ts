type EventLog = {
  event: string;
  success: boolean;
  executedUseCase: string;
};

export abstract class SubscriptionHandler {
  protected logEvent(log: EventLog) {
    console.log(
      `[${log.event}]: ${log.success ? 'Successfully executed' : 'Failed to execute'} ${log.executedUseCase} use case`,
    );
  }

  protected abstract setupSubscriptions(): void;
}
