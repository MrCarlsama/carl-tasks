import { useHttp } from "utils/http";
import { Project } from "types/project";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./useOpimisticOptions";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // const { run, ...result } = useAsync<Project[]>();

  // const fetchProjects = useCallback(
  //   () =>
  //     client("projects", {
  //       data: cleanObject(param || {}),
  //     }),
  //   [client, param]
  // );

  // useEffect(() => {
  //   run(fetchProjects(), {
  //     retry: fetchProjects,
  //   });
  // }, [param, run, fetchProjects]);

  // return result;

  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "POST",
  //     })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};
