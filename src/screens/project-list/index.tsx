import { List } from "./List";
import { SearchPanel } from "./SearchPanel";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Button, Row, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/users";
import { useProjectsSearchParams } from "./util";
import { ButtonNoPadding } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./projectList.slice";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const dispatch = useDispatch();

  const [param, setParam] = useProjectsSearchParams();

  const { data: list, error, isLoading, retry } = useProjects(
    useDebounce(param, 200)
  );

  const { data: users } = useUsers();

  return (
    <Container>
      <Row justify={"space-between"}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={() => dispatch(projectListActions.openProjectModal())}
          type={"link"}
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
