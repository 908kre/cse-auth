import DataGrid from "react-data-grid";
import { Role } from "@csea/core/role";
import { RoleUser } from "@csea/core/roleUser";
import { CreateBtn } from "@csea/web/components/buttons";
import { UserTags } from "@csea/web/components/user-tags";

export const RoleTable = (props: {
  rows: Role[];
  roleUsers?: RoleUser[]
  onEdit?: (row: Role) => void;
  onCreate?: () => void;
}) => {
  const roleUsers = props.roleUsers
  const columns = [
    { key: "systemId", name: "システムID" },
    { key: "id", name: "ロールID" },
    { 
      key: "user",
      name: "ユーザー",
      formatter(props){
        const rows = roleUsers?.filter(x => x.roleId === props.row.id)
        if(rows){
          return <UserTags roleUsers={rows}/>
        }
        return  <div/>
      }
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
