import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { type Logger } from '../logger';

type LoggerOptions = {
  isDevelopment: boolean;
};

export class WinstonLogger implements Logger {
  private readonly logger: winston.Logger;

  constructor(private readonly options: LoggerOptions) {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        }),
      ),
      transports: [
        new DailyRotateFile({
          filename: 'logs/app-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '30d',
        }),
      ],
    });

    this.configure();
  }

  private configure() {
    if (this.options.isDevelopment) {
      this.logger.add(new winston.transports.Console());
    }
  }

  error(message: string | Error, ...optionalParams: unknown[]): void {
    if (message instanceof Error) {
      this.logger.error(message);
      return;
    }

    this.logger.error(message, optionalParams);
  }

  warn(message: string, ...optionalParams: unknown[]): void {
    this.logger.warn(message, optionalParams);
  }

  info(message: string, ...optionalParams: unknown[]): void {
    this.logger.info(message, optionalParams);
  }

  debug(message: string, ...optionalParams: unknown[]): void {
    this.logger.debug(message, optionalParams);
  }
}
