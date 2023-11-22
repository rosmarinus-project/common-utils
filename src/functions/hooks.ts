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
    setDataInFn: async (fn: (data: T) => T) => {
      const nowData = await getData();

      data = fn(nowData);
    },
  };
}
