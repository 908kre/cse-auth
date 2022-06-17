import React, { useState } from "react";
import { System, Systems, Roles, Role, RoleUsers } from "../../models";
import TableHeader from "../TableHeader";
import CreateBtn from "../CreateBtn";
import UpdateBtn from "../UpdateBtn";
import DeleteBtn from "../DeleteBtn";

const endStyle: React.CSSProperties = { 
  display: "flex", 
  justifyContent: "flex-end", 
  flexWrap: "nowrap" 
};
export default function RoleUserTable(props: {
  // roleUsers: RoleUsers;
//   systemId: string
//   roles: Roles;
  roleId: string;
  roleUsers: RoleUsers

  onDeleteClick: (roleId: string) => void;
  onCreateClick?: () => void;

}) {
  const {
    // roleUsers,
    roleId,
    roleUsers,
    onDeleteClick,
    // RoleTags,
    onCreateClick,
    // userId,
    // rolecode,
  } = props;

// 要変更
  const isCreateable = true


  const columns = ["会社コード", "人名コード",  "action"];
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

  const userIds = props.roleUsers
  .filter((x)=> x.roleId === props.roleId)
  .map((x)=> x.id)
  .toSet()

  const userId = props.roleUsers.filter((x)=> userIds.has(x.id)).toList();
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
//   ユーザー
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

//                 {userId.toList().map((x) => (
//                 <div 
//                     className="p-1"
//                     key={x.id}
//                 >
//                     <td>
//                      {x.companyCode}
//                     </td>
//                     <td>
//                      {x.userCode}
//                     </td>
//                     <td>
//                     <div className="buttons" style={endStyle}>
//                         <UpdateBtn onClick={() => onEditClick(x.id)} />
//                         <DeleteBtn onClick={() => onDeleteClick(x.id)} />
//                     </div>
//                     </td>
//                 </div>
//                 ))}
//             </div>
//           </tr>
//       </tbody>
//     </table>
//   </div>
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
  ユーザー
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
        {userId.toList().map((x)=>(
            <tr key={x.id}>
                    <td>
                     {x.companyCode}
                    </td>
                    <td>
                     {x.userCode}
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