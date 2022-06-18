import DataGrid from "react-data-grid";
import { System } from "@csea/core/system";

const columns = [
  { key: "id", name: "ID" },
  { key: "name", name: "名前" },
];

export const SystemTable = (props: { rows: System[] }) => {
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

export default SystemTable;
