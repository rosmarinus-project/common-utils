import * as winston from 'winston';

export type FileLogger = winston.Logger;

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
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta,
    transports: [],
  });

  if (!isProduction) {
    /** 非生产环境的话，打到控制台 */
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    );
  } else {
    if (fileLevel === 'info') {
      logger.add(new winston.transports.File({ dirname: logFileDir, filename: 'info.log', level: 'info' }));
    } else if (fileLevel === 'error') {
      logger.add(new winston.transports.File({ dirname: logFileDir, filename: 'info.log', level: 'error' }));
    } else {
      logger.add(new winston.transports.File({ dirname: logFileDir, filename: 'combined.log' }));
    }
  }

  return {
    defaultLogger: logger,
  };
}
