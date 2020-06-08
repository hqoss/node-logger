import pino, { LoggerOptions } from "pino";
import { v4 as uuidv4 } from "uuid";

import { PinoLogger } from "../../src/loggers";

jest.mock("pino");

describe("PinoLogger", () => {
  let mockedPino: any = pino;

  let logger: PinoLogger;

  let correlationId: string;

  let args: {
    message?: string;
    meta?: Record<string, any>;
    initOpts?: LoggerOptions;
  };

  const setArgs = (initOpts: LoggerOptions) => ({
    message,
    metadata,
  }: {
    message: string;
    metadata: Record<string, any>;
  }) => {
    args.message = message;
    args.meta = metadata;
    args.initOpts = initOpts;
  };

  beforeAll(() => {
    mockedPino.mockImplementation((initOpts: LoggerOptions) => ({
      debug: setArgs(initOpts),
      info: setArgs(initOpts),
      warn: setArgs(initOpts),
      error: setArgs(initOpts),
    }));
  });

  beforeEach(() => {
    correlationId = uuidv4();
    args = {};
  });

  it("logs debug message", () => {
    logger = new PinoLogger({ correlationId });

    logger.debug("debug message");

    expect(args).toEqual({
      message: "debug message",
      meta: {
        correlationId,
        pid: process.pid,
      },
      initOpts: PinoLogger.initOpts,
    });
  });

  it("logs info message", () => {
    logger = new PinoLogger({ correlationId });

    logger.info("info message");

    expect(args).toEqual({
      message: "info message",
      meta: {
        correlationId,
        pid: process.pid,
      },
      initOpts: PinoLogger.initOpts,
    });
  });

  it("logs warn message", () => {
    logger = new PinoLogger({ correlationId });

    logger.warn("warn message");

    expect(args).toEqual({
      message: "warn message",
      meta: {
        correlationId,
        pid: process.pid,
      },
      initOpts: PinoLogger.initOpts,
    });
  });

  it("logs error message", () => {
    logger = new PinoLogger({ correlationId });

    logger.error("error message");

    expect(args).toEqual({
      message: "error message",
      meta: {
        correlationId,
        pid: process.pid,
      },
      initOpts: PinoLogger.initOpts,
    });
  });

  it("logs error stack", () => {
    logger = new PinoLogger({ correlationId });

    const error = new Error("error object");

    logger.error(error);

    expect(args).toEqual({
      message: error.stack,
      meta: {
        correlationId,
        pid: process.pid,
      },
      initOpts: PinoLogger.initOpts,
    });
  });

  it("uses ISO datetime as timestamp by default", () => {
    // TODO match against ISO date string
    const timestampFormatter = PinoLogger.initOpts?.timestamp;

    if (timestampFormatter && typeof timestampFormatter === "function") {
      expect(timestampFormatter()).toMatch(`,"timestamp":"`);
    } else {
      throw new Error("timestamp formatter must be implemented");
    }
  });

  it("uses custom level formatter by default", () => {
    const levelFormatter = PinoLogger.initOpts?.formatters?.level;

    if (levelFormatter) {
      expect(levelFormatter("debug", 42)).toEqual({ level: "debug" });
    } else {
      throw new Error("level formatter must be implemented");
    }
  });

  it("merges user-provided opts with default opts", () => {
    logger = new PinoLogger({ correlationId, base: { app: "test-runner" } });

    logger.info("info message with app");

    expect(args).toEqual({
      message: "info message with app",
      meta: {
        correlationId,
        pid: process.pid,
      },
      initOpts: {
        ...PinoLogger.initOpts,
        base: { app: "test-runner" },
      },
    });
  });

  it("logs custom metadata", () => {
    logger = new PinoLogger({ correlationId });

    logger.info("info message");

    expect(args.meta).toEqual({
      correlationId,
      pid: process.pid,
    });

    logger.metadata({ userId: "john-doe" });
    logger.info("info message with custom meta");

    expect(args.meta).toEqual({
      correlationId,
      pid: process.pid,
      userId: "john-doe",
    });
  });
});
