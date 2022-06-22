import DataGrid from "react-data-grid";
import { Role } from "@csea/core/role";
import { CreateBtn } from "@csea/web/components/buttons";

export const RoleTable = (props: {
  rows: Role[];
  onEdit?: (row: Role) => void;
  onCreate?: () => void;
}) => {
  const columns = [
    { key: "systemId", name: "システムID" },
    { key: "id", name: "ロールID" },
    { key: "action", name: "操作"},
  ];
  return (
    <DataGrid
      columns={columns}
      rows={props.rows}
      onRowClick={(_, x) => props.onEdit?.(x)}
      defaultColumnOptions={{
        resizable: true,
      }}
    />
  );
};

export default RoleTable;
