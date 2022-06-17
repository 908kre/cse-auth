import React from "react";
import { Role, Roles, System, Systems } from "../../models"
import { Map, is } from "immutable";
//import { Trans } from "react-i18next";
//import { isMutable } from "@fpalm-auth/core/user";

// import NameRoleTag from "@fpalm-auth/web/components/NameRoleTag";


export default function RoleTags(props: {
  systemId: string;
  roles: Roles;
  // userGroups: UserGroups;
  //systems: Systems
  // claims?: Claims;
  // onClick: (Id: string) => void;
  style?:React.CSSProperties,
  
}) {
  // const { claims } = props;
//   const roleIds = props.systems
//     .filter((x) => x.id === props.systemId)
//     .map((x) => x.roleId)
//     .toSet();
  const roleIds = props.roles
    .filter((x)=> x.systemId === props.systemId)
    .map((x) => x.id)
    .toSet();

  const roles = props.roles.filter((x) => roleIds.has(x.id)).toList();

  return (
    <div 
      style={{
        display: "flex",
        flexWrap: "wrap",
        ...props.style
      }}
    >
      {roles.toList().map((x) => (
        <div 
          className="p-1"
          key={x.id}
        >
          {x.name}
          {/* <NameRoleTag
            key={x.id}
            name={`${x.id} <${x.name}>`}
            role={x.role}
            onClick={() =>
              claims && isMutable({ claims, user: x }) && props.onClick(x.id)
            }
            isEditable={claims && isMutable({ claims, user: x })}
          /> */}
        </div>
        
      ))}
    </div>
    
  );
}
