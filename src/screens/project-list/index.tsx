import { useEffect, useState } from "react";
import List from "./List";
import SearchPanel from "./SearchPanel";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);

  const [users, setUsers] = useState([]);

  const debounceParam = useDebounce(param, 200);

  const client = useHttp();

  useEffect(() => {
    client("projects", {
      data: cleanObject(debounceParam),
    }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);

    // fetch(`${apiUrl}/users`).then(async (res) => {
    //   if (res.ok) {
    //     setUsers(await res.json());
    //   }
    // });
  });

  return (
    <div>
      <SearchPanel param={param} users={users} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};

export default ProjectListScreen;
