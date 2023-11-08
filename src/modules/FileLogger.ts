import { createLogger, format, transports, type Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { SPLAT } from 'triple-beam';
import { safeJSONStringify } from '../functions';

export type FileLogger = Logger;

export interface FileLoggerFactory {
  defaultLogger: FileLogger;
}

export interface FileLoggerOptions {
  isProduction: boolean;
  defaultMeta?: any;
  logFileDir?: string;
  /** 默认 all */
  fileLevel?: 'error' | 'info' | 'all' | 'in-hour';
}

const customFormat = format.printf((data) => {
  const { level, timestamp, message, ...rest } = data;

  const notObjMeta = rest[SPLAT] as any[];

  const notObjMetaOutput =
    notObjMeta
      ?.map((item) => {
        if (typeof item === 'object') {
          return '';
        }

        return `, ${String(item)}`;
      })
      .join('') || '';

  const metaOutput = Object.keys(rest)
    .map((key) => `, ${safeJSONStringify({ [key]: rest[key] })}`)
    .join('');

  return `${timestamp} [${level.toUpperCase()}]: ${message}${notObjMetaOutput}${metaOutput}`;
});

export function initFileLoggerFactory({
  isProduction,
  defaultMeta,
  fileLevel = 'all',
  logFileDir,
}: FileLoggerOptions): FileLoggerFactory {
  const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.json(),
      customFormat,
    ),
    defaultMeta,
    transports: [],
  });

  if (!isProduction) {
    /** 非生产环境的话，打到控制台 */
    logger.add(new transports.Console());
  } else {
    if (fileLevel === 'in-hour') {
      logger.add(
        new DailyRotateFile({
          dirname: logFileDir,
          filename: 'log-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          // zippedArchive: true,
          maxSize: '100m',
        }),
      );
    } else if (fileLevel === 'info') {
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
