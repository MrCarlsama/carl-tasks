import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // 每次value变化时候，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);

    // return 函数 在 上一个useEffect处理结束后再运行。
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
