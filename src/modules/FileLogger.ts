import { createLogger, format, transports, type Logger } from 'winston';

export type FileLogger = Logger;

export interface FileLoggerFactory {
  defaultLogger: FileLogger;
}

export interface FileLoggerOptions {
  isProduction: boolean;
  defaultMeta?: any;
  logFileDir?: string;
  /** 默认 all */
  fileLevel?: 'error' | 'info' | 'all';
}

export function initFileLoggerFactory({
  isProduction,
  defaultMeta,
  fileLevel = 'all',
  logFileDir,
}: FileLoggerOptions): FileLoggerFactory {
  const logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta,
    transports: [],
  });

  if (!isProduction) {
    /** 非生产环境的话，打到控制台 */
    logger.add(
      new transports.Console({
        format: format.simple(),
      }),
    );
  } else {
    if (fileLevel === 'info') {
      logger.add(new transports.File({ dirname: logFileDir, filename: 'info.log', level: 'info' }));
    } else if (fileLevel === 'error') {
      logger.add(new transports.File({ dirname: logFileDir, filename: 'info.log', level: 'error' }));
    } else {
      logger.add(new transports.File({ dirname: logFileDir, filename: 'combined.log' }));
    }
  }

  return {
    defaultLogger: logger,
  };
}