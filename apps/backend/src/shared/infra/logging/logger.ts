export interface Logger {
  fatal?(message: string, ...optionalParams: unknown[]): unknown;
  error(message: string | Error, ...optionalParams: unknown[]): unknown;
  warn(message: string, ...optionalParams: unknown[]): unknown;
  info(message: string, ...optionalParams: unknown[]): unknown;
  debug(message: string, ...optionalParams: unknown[]): unknown;
}
