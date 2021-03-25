import { cleanObject } from "utils";
import { useAsync } from "utils/useAsync";
import { useMount } from "utils";
import { useHttp } from "utils/http";
import { User } from "types/user";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<User[]>();

  useMount(() => {
    run(
      client("users", {
        data: cleanObject(param || {}),
      })
    );
  });

  return result;
};
