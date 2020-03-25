import { LoggerOptions } from "pino";

export type PinoLoggerInitOpts = LoggerOptions & {
  correlationId: string;
};
