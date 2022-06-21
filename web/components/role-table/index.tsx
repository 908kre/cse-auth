import DataGrid from "react-data-grid";
import { Role } from "@csea/core/role";
import { CreateBtn } from "@csea/web/components/buttons";

export const RoleTable = (props: {
  rows: Role[];
  onEdit?: (row: Role) => void;
  onCreate?: () => void;
}) => {
  const columns = [
    { key: "id", name: "ID" },
    { key: "name", name: "名前" },
    {
      key: "charge",
      name: "Charge",
      headerRenderer: ({ column }) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{column.name}</span>
            <CreateBtn onClick={() => props.onCreate?.()} />
          </div>
        );
      },
    },
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
