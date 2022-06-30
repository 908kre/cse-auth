import DataGrid from "react-data-grid";
import { Role } from "@csea/core/role";
import { RoleUser } from "@csea/core/roleUser";
import { RoleGroup } from "@csea/core/roleGroup";
import { CreateBtn } from "@csea/web/components/buttons";
import { UserTags } from "@csea/web/components/user-tags";
import { GroupTags } from "@csea/web/components/group-tags";

export const RoleTable = (props: {
  rows: Role[];
  roleUsers?: RoleUser[]
  roleGroups?: RoleGroup[]
  onEdit?: (row: Role) => void;
  onCreate?: () => void;
}) => {
  const { roleUsers, roleGroups } = props;
  const columns = [
    { key: "systemId", name: "システムID", width: "15%" },
    { key: "name", name: "ロールコード", width: "15%" },
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
    { 
      key: "group",
      name: "グループ",
      formatter(props){
        const rows = roleGroups?.filter(x => x.roleId === props.row.id)
        if(rows){
          return <GroupTags roleGroups={rows}/>
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
