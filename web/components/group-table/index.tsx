import DataGrid from "react-data-grid";
import { RoleGroup } from "@csea/core/roleGroup";
import { CreateBtn } from "@csea/web/components/buttons";

export const UserTable = (props: {
  rows: RoleGroup[];
  onEdit?: (row: RoleGroup) => void;
  onCreate?: () => void;
}) => {
  const columns = [
    { key: "groupId", name: "ID", width: "40%"},
    { key: "post", name: "役職コード", width: "40%"},
    { key: "action", name: "操作" },
  ];
  return (
    <DataGrid
      columns={columns}
      rows={props.rows}
      defaultColumnOptions={{
        resizable: true,
      }}
    />
  );
};

export default UserTable;
