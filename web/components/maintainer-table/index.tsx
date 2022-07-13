import DataGrid from "react-data-grid";
import { Maintainer } from "@csea/core/maintainer";
import { CreateBtn } from "@csea/web/components/buttons";
import { DeleteBtn } from "@csea/web/components/buttons";

export const MaintainerTable = (props: {
  rows: Maintainer[];
  onEdit?: (row: Maintainer) => void;
  onCreate?: () => void;
  onDelete?: (id:string, systemId:string) => void;
}) => {
  const columns = [
    { key: "id", name: "ID"},
    { key: "systemId", name: "システムID"},
    { key: "action", name: "操作", width: "5%",
      formatter(column) {
        return (
          <div className="buttons">
            <DeleteBtn onClick={() => props.onDelete?.(column.row.id, column.row.systemId)} />
          </div>
        )
      },
    }
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

export default MaintainerTable;
