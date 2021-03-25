import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TaskTypeSelect } from "components/taskTypeSelect";
import { UserSelect } from "components/userSelect";
import { useSetUrlSearchParam } from "utils/url";
import { useTaskSearchParams } from "./util";

export const SearchPanel = () => {
  const searchParams = useTaskSearchParams();
  const setSearchParams = useSetUrlSearchParam();

  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName={"经办人"}
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={"类型"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>重置</Button>
    </Row>
  );
};
