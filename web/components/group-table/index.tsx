import DataGrid from "react-data-grid";
import { RoleGroup } from "@csea/core/roleGroup";
import { CreateBtn } from "@csea/web/components/buttons";
import { DeleteBtn } from "@csea/web/components/buttons";
export const UserTable = (props: {
  rows: RoleGroup[];
  onEdit?: (row: RoleGroup) => void;
  onCreate?: () => void;
  onDelete?: (groupId:string, post:string) => void;
}) => {
  const endStyle: React.CSSProperties = { display: "flex", justifyContent: "flex-end", flexWrap: "nowrap" };
  const columns = [
    { key: "groupId", name: "ID", width: "40%"},
    { key: "post", name: "役職コード", width: "40%"},
    { key: "action", name: "操作",
      formatter(column) {
        return (
          <div className="buttons" style={endStyle}>
            <DeleteBtn onClick={() => props.onDelete?.(column.row.groupId, column.row.post)} />
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
