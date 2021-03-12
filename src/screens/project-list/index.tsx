import { useEffect, useState } from "react";
import List from "./List";
import SearchPanel from "./SearchPanel";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

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
    // eslint-disable-next-line  react-hooks/exhaustive-deps
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
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} users={users} setParam={setParam} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
