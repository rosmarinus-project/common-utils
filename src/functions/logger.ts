import chalk from 'chalk';

function Log(...params: Parameters<typeof console.log>) {
  console.log(...params);
}

export const enum LogType {
  info = 'info',
  warn = 'warn',
  error = 'error',
  file = 'file',
}

function getLogFunc(): Record<LogType, chalk.Chalk> {
  return {
    info: chalk.cyan.green,
    warn: chalk.cyan.yellow,
    error: chalk.cyan.red,
    file: chalk.white,
  };
}

export function info(...args: Parameters<typeof console.log>) {
  Log(chalk.cyan.green(...args));
}

export function warn(...args: Parameters<typeof console.log>) {
  Log(chalk.cyan.yellow(...args));
}

export function error(...args: Parameters<typeof console.log>) {
  Log(chalk.cyan.red(...args));
}

export function file(...args: Parameters<typeof console.log>) {
  Log(chalk.white(...args));
}

export function logMix(output: { type: LogType; str: string }[]) {
  const str = output.map(({ type, str }) => getLogFunc()[type](str)).join('');

  Log(str);
}
