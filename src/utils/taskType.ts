import { TaskType } from "types/taskType";
import { useHttp } from "utils/http";
import { useQuery } from "react-query";

export const useTaskTypes = (param?: Partial<TaskType>) => {
  const client = useHttp();
  // react-query 对重复请求只会发送一次
  return useQuery<TaskType[]>(["tasksTypes", param], () => client("taskTypes"));
};
