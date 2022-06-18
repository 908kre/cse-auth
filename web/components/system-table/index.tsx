import DataGrid from "react-data-grid";
import { System } from "@csea/core/system";

const columns = [
  { key: "id", name: "ID" },
  { key: "name", name: "名前" },
];

export const SystemTable = (props: {
  rows: System[];
  onEdit?: (row: System) => void;
}) => {
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
