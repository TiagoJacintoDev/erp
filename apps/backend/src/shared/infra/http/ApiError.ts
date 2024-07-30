type ApiErrorProps = {
  name?: string;
  message: string;
  status: number;
};

export class ApiError extends Error {
  public readonly status: number;

  constructor({ message, status, name }: ApiErrorProps) {
    super(message);
    this.status = status;
    this.name = name || this.constructor.name;
  }
}
