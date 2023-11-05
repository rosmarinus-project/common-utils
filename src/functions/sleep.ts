/**
 * 延迟一定毫秒
 */
export const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
 *
 */
export const requestIdle = (timeout = 1000) => new Promise((resolve) => requestIdleCallback(resolve, { timeout }));

/**
 * 超时
 */
export const timeout = (ms = 0) => new Promise((reject) => setTimeout(reject, ms));
