import pino, { Logger, LoggerOptions } from "pino";

import { PinoLoggerInitOpts } from "./types";

class PinoLogger {
  private readonly log: Logger;
  private meta: Record<string, any>;

  constructor({ correlationId, ...opts }: PinoLoggerInitOpts) {
    const { pid } = process;
    const { initOpts } = PinoLogger;

    this.log = pino({
      ...initOpts,
      ...opts,
    });

    this.meta = { correlationId, pid };
  }

  static readonly initOpts: LoggerOptions = {
    timestamp: () => {
      const now = new Date().toISOString();
      return `,"timestamp":"${now}"`;
    },
    level: "debug",
    formatters: {
      level(label: string, _number: number) {
        return { level: label };
      },
    },
  };

  /**
   * Sets metadata onto the instance.
   *
   * @param {Object} meta - The metadata to be added to existing metadata.
   */
  metadata = (meta: Record<string, any>) => {
    this.meta = {
      ...this.meta,
      ...meta,
    };
  };

  /**
   * Logs debug-level message.
   *
   * @param {string} message - The message to be logged.
   */
  debug = (message: string) =>
    this.log.debug({
      message,
      metadata: this.meta,
    });

  /**
   * Logs info-level message.
   *
   * @param {string} message - The message to be logged.
   */
  info = (message: string) =>
    this.log.info({
      message,
      metadata: this.meta,
    });

  /**
   * Logs warn-level message.
   *
   * @param {string} message - The message to be logged.
   */
  warn = (message: string) =>
    this.log.warn({
      message,
      metadata: this.meta,
    });

  /**
   * Logs error-level message.
   *
   * @param {Error|string} message - The error object or message to be logged.
   */
  error = (error: Error | string) =>
    this.log.error({
      message: error instanceof Error ? error.stack : error,
      metadata: this.meta,
    });
}

export default PinoLogger;
