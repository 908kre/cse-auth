import React, { useState } from "react";
// import styled from "styled-components";
// import { User, Users, Role, Claims } from "@fpalm-auth/web/models";
// import { useTranslation } from "react-i18next";
// import Divider from "fpalm-web-components/components/Divider";
// import { isMutable } from "@fpalm-auth/core/user";
import { System, Systems, Roles, Role, RoleUsers } from "../../models";
import TableHeader from "../TableHeader";
import CreateBtn from "../CreateBtn";
import UpdateBtn from "../UpdateBtn";
import DeleteBtn from "../DeleteBtn";


// const sortColumns = ["userId", "name", "role"];
const endStyle: React.CSSProperties = { 
  display: "flex", 
  justifyContent: "flex-end", 
  flexWrap: "nowrap" 
};
export default function SystemRoleTable(props: {
  // roleUsers: RoleUsers;
  systemId: string
  roles: Roles;
  // RoleTags: React.ComponentType<{ systemId: string }>;
  onDeleteClick: (roleId: string) => void;
  onEditClick: (roleId: string) => void;
  onCreateClick?: () => void;
  // userId?: string;
// claims?: Role.code;
  // rolecode: Role["code"];
}) {
  const {
    // roleUsers,
    systemId,
    roles,
    onDeleteClick,
    onEditClick,
    // RoleTags,
    onCreateClick,
    // userId,
    // rolecode,
  } = props;

// 要変更
  const isCreateable = true
  // let rows = System
  //   .map(x => {
  //     return {
  //       ...x,
  //       systemId: x.id,
  //     }
  //   })
  //   .toList()

  const columns = [ "名前",  "action"];
  const renders = {
    action: (
      <div style={endStyle}>
        {onCreateClick && isCreateable && <CreateBtn onClick={() => onCreateClick()} />}

      </div>
    ),
  };
  const roleIds = props.roles
  .filter((x)=> x.systemId === props.systemId)
  .map((x) => x.id)
  .toSet();

  const roleId = props.roles.filter((x) => roleIds.has(x.id)).toList();
//   return (

    
//     <table className="table is-fullwidth">
//       {/* <label 
//         className="label is-medium"
//         style={{paddingTop: '0.5em'}}
//         >
//         ロール
//       </label> */}
//       <TableHeader
//         columns={columns}
//         // sortColumns={sortColumns}
//         renders={renders}
//         // sort={sort}
//         // onChange={setSort}
//       />
//       <tbody>
        
//         {/* {rows.map((x) => ( */}
//           <tr key={props.systemId}>
//             <td>
//             <div 
//               style={{
//               display: "flex",
//               flexWrap: "wrap",
//         //...props.style
//               }}>
//         {roleId.toList().map((x) => (
//         <div 
//           className="p-1"
//           key={x.id}
//         >
//           {x.name}
//           {/* <NameRoleTag
//             key={x.id}
//             name={`${x.id} <${x.name}>`}
//             role={x.role}
//             onClick={() =>
//               claims && isMutable({ claims, user: x }) && props.onClick(x.id)
//             }
//             isEditable={claims && isMutable({ claims, user: x })}
//           /> */}
//         </div>
        
//       ))}
//     </div>
//     </td>
//             {/* <div className="field-label is-normal">
//              <label className="label">{("name")}</label>
//             </div> */}
//               {/* <div
//                 style={{
//                   display: "flex",
//                   flexWrap: "nowrap",
//                 }}
//               > */}
//                 {/* <RoleTags systemId={props.systemId} /> */}
//                 {/* <a className="pr-1"
//                   onClick={() => claims && isMutable({ claims, user: x }) && onEditClick(x.id)}
//                 >
//                   {x.name}
//                 </a>  */}
//                 {/* {claims?.userId === x.id && <ItsYou />} */}
//               {/* </div>
//             </td> */}
//             {/* <td>{x.name}</td>
//             <td>
//               <RoleTag role={x.role} />
//             </td>
//             <td>
//               <Tags userId={x.id} />
//             </td> */}
//             <td>
//             {roleId.toList().map((x) => (
//               <div className="buttons" style={endStyle}>
//                 {/* {claims && isMutable({ claims, role: x }) && (
//                   <UpdateBtn onClick={() => onEditClick(x.id)} />
//                 )}
//                 {claims && isMutable({ claims, user: x }) && (
//                   <DeleteBtn onClick={() => onDeleteClick(x.id)} />
//                 )} */}
//                 {/* {claims } */}
//                 <UpdateBtn onClick={() => onEditClick(x.id)} />
//                 <DeleteBtn onClick={() => onDeleteClick(x.id)} />
//               </div>
//                     ))}
//             </td>
//           </tr>
        
//       </tbody>
//     </table>
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
ロール
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
      {roleId.toList().map((x)=>(
          <tr key={x.id}>
                  {/* <td>
                   {x.code}
                  </td> */}
                  <td>
                   {x.name}
                  </td>
                  <td>
                  <div className="buttons" style={endStyle}>
                      <UpdateBtn onClick={() => onEditClick(x.id)} />
                      <DeleteBtn onClick={() => onDeleteClick(x.id)} />
                  </div>
                  </td>
          </tr>
      ))}
    </tbody>
</table>
</div>
)}