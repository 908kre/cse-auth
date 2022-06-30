import DataGrid from "react-data-grid";
import { RoleUser } from "@csea/core/roleUser";
import { CreateBtn } from "@csea/web/components/buttons";
import { DeleteBtn } from "@csea/web/components/buttons";
export const UserTable = (props: {
  rows: RoleUser[];
  onEdit?: (row: RoleUser) => void;
  onCreate?: () => void;
  onDelete?: (value:string) => void;
}) => {
  const endStyle: React.CSSProperties = { display: "flex", justifyContent: "flex-end", flexWrap: "nowrap" };
  const columns = [
    { key: "userId", name: "ID", width: "90%"},
    { key: "action", name: "操作",
      formatter(column) {
        return (
          <div className="buttons" style={endStyle}>
            <DeleteBtn onClick={() => props.onDelete?.(column.row.userId)} />
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

export default UserTable;
