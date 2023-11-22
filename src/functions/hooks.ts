import { isPromise } from './is-type';

export function hookAsyncData<T>(init: Promise<T> | (() => Promise<T>)) {
  const initPromise = isPromise(init) ? init : init();
  let data: T | undefined = undefined;

  const getData = async () => {
    if (data !== undefined) {
      return data;
    }

    return initPromise;
  };

  return {
    getData,
    setData: (newData: T) => {
      data = newData;
    },
    setDataInFn: (fn: (data: T) => T) => {
      getData().then((nowData) => {
        data = fn(nowData);
      });
    },
  };
}
