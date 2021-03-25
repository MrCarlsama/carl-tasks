import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { Task } from "types/task";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  // react-query 对重复请求只会发送一次
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
