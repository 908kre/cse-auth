import React, { useState } from "react";
import { System, Systems, Roles, Role, RoleGroups } from "../../models";
import TableHeader from "../TableHeader";
import CreateBtn from "../CreateBtn";
import UpdateBtn from "../UpdateBtn";
import DeleteBtn from "../DeleteBtn";

const endStyle: React.CSSProperties = { 
  display: "flex", 
  justifyContent: "flex-end", 
  flexWrap: "nowrap" 
};
export default function RoleGroupTable(props: {
  // roleUsers: RoleUsers;
//   systemId: string
//   roles: Roles;
  roleId: string;
  roleGroups: RoleGroups

  onDeleteClick: (roleId: string) => void;
  onCreateClick?: () => void;

}) {
  const {
    // roleUsers,
    roleId,
    roleGroups,
    onDeleteClick,
    // RoleTags,
    onCreateClick,
    // userId,
    // rolecode,
  } = props;

// 要変更
  const isCreateable = true


  const columns = ["会社コード", "課", "役職",  "action"];
  const renders = {
    action: (
      <div style={endStyle}>
        {onCreateClick && isCreateable && <CreateBtn onClick={() => onCreateClick()} />}

      </div>
    ),
  };
//   const roleIds = props.roles
//   .filter((x)=> x.systemId === props.systemId)
//   .map((x) => x.id)
//   .toSet();

//   const roleId = props.roles.filter((x) => roleIds.has(x.id)).toList();

  const groupIds = props.roleGroups
  .filter((x)=> x.roleId === props.roleId)
  .map((x)=> x.id)
  .toSet()

  const groupId = props.roleGroups.filter((x)=> groupIds.has(x.id)).toList();
//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100%',
//         width: '100%',
//         padding: '0.25em'
//       }}
//     >
//     <label 
//     className="label is-medium"
//     style={{paddingTop: '0.5em'}}
//     >
//   グループ
//   </label>
//     <table className="table is-fullwidth">
//       <TableHeader
//         columns={columns}
//         // sortColumns={sortColumns}
//         renders={renders}
//         // sort={sort}
//         // onChange={setSort}
//       />
//       <tbody>
//           <tr key={props.roleId}>
//             <div 
//               style={{
//               display: "flex",
//               flexWrap: "wrap",
//                 //...props.style
//             }}>

//                 {groupId.toList().map((x) => (
//                 <div 
//                     className="p-1"
//                     key={x.id}
//                 >
//                     <td>
//                      {x.companyCode}
//                     </td>
//                     <td>
//                      {x.divisionCode}
//                     </td>
//                     <td>
//                      {x.post}
//                     </td>

//                     <div className="buttons" style={endStyle}>
//                         <UpdateBtn onClick={() => onEditClick(x.id)} />
//                         <DeleteBtn onClick={() => onDeleteClick(x.id)} />
//                     </div>
//                 </div>
//                 ))}
//             </div>
//           </tr>
//       </tbody>
//     </table>
//     </div>
//   );
// };

return(
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      padding: '0.25em'
    }}
  >
  <label 
  className="label is-medium"
  style={{paddingTop: '0.5em'}}
  >
グループ
</label>
  <table className="table is-fullwidth">
    <TableHeader
      columns={columns}
      //sortColumns={sortColumns}
      renders={renders}
      //sort={sort}
      //onChange={setSort}
    />
    <tbody>
      {groupId.toList().map((x)=>(
          <tr key={x.id}>
                    <td>
                     {x.companyCode}
                    </td>
                    <td>
                     {x.divisionCode}
                    </td>
                    <td>
                     {x.post}
                    </td>
                  <td>
                  <div className="buttons" style={endStyle}>
                      <DeleteBtn onClick={() => onDeleteClick(x.id)} />
                  </div>
                  </td>
          </tr>
      ))}
    </tbody>
</table>
</div>
)}