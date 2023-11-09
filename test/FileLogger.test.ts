import { initFileLoggerFactory } from '../src';

describe('FileLogger', () => {
  beforeEach(() => {});

  afterEach(() => {});

  test('log meta', () => {
    const logger = initFileLoggerFactory({ fileMode: 'console' }).defaultLogger;

    logger.info('log meta', { a: 1, b: 2 });
  });

  test('log msg', () => {
    const logger = initFileLoggerFactory({ fileMode: 'console' }).defaultLogger;

    logger.info('log msg');
  });

  test('log not obj meta', () => {
    const logger = initFileLoggerFactory({ fileMode: 'console' }).defaultLogger;

    logger.info('log not obj meta', 1, 'meta');
  });
});
