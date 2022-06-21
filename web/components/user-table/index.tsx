import DataGrid from "react-data-grid";
import { RoleUser } from "@csea/core/roleUser";
import { CreateBtn } from "@csea/web/components/buttons";

export const UserTable = (props: {
  rows: RoleUser[];
  onEdit?: (row: RoleUser) => void;
  onCreate?: () => void;
}) => {
  const columns = [
    { key: "userId", name: "ID", width: "90%"},
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
