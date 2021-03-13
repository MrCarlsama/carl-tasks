import { cleanObject } from "utils";
import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

/**
 * 返回页面URL中，指点键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();

  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (param: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...param,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const;
};
