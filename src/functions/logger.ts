import chalk from 'chalk';

const Log = function (...params: Parameters<typeof console.log>) {
  console.log(...params);
};

export const enum LogType {
  info = 'info',
  warn = 'warn',
  error = 'error',
  file = 'file',
}

const LogFunc: Record<LogType, chalk.Chalk> = {
  info: chalk.cyan.green,
  warn: chalk.cyan.yellow,
  error: chalk.cyan.red,
  file: chalk.white,
};

export function info(...args: Parameters<typeof console.log>) {
  Log(LogFunc.info(...args));
}

export function warn(...args: Parameters<typeof console.log>) {
  Log(LogFunc.warn(...args));
}

export function error(...args: Parameters<typeof console.log>) {
  Log(LogFunc.error(...args));
}

export function file(...args: Parameters<typeof console.log>) {
  Log(LogFunc.file(...args));
}

export function logMix(output: { type: LogType; str: string }[]) {
  const str = output.map(({ type, str }) => LogFunc[type](str)).join('');

  Log(str);
}
