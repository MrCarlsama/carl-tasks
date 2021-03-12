import { cleanObject } from "utils";
import { useEffect } from "react";
import { useHttp } from "utils/http";
import { useAsync } from "utils/useAsync";
import { Project } from "screens/project-list/List";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(
      client("projects", {
        data: cleanObject(param || {}),
      })
    );
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
