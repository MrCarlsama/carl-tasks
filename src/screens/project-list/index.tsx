import { useState } from "react";
import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/users";

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debounceParam = useDebounce(param, 200);

  const { data: list, error, isLoading } = useProjects(debounceParam);

  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <h1>项目列表</h1>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListScreen;
