import DataGrid from "react-data-grid";
import { System } from "@csea/core/system";
import { CreateBtn } from "@csea/web/components/buttons";

export const SystemTable = (props: {
  rows: System[];
  onEdit?: (row: System) => void;
  onCreate?: () => void;
}) => {
  const columns = [
    { key: "id", name: "ID" },
    {
      key: "name",
      name: "名前",
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

export default SystemTable;
