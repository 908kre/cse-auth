import React from "react";
//import { User, Users, UserGroups, Claims } from "@fpalm-auth/web/models";
import { Map, is } from "immutable";
//import { Trans } from "react-i18next";
//import { isMutable } from "@fpalm-auth/core/user";
import { RoleUser, RoleUsers } from "../../models";



export default function UserTags(props: {
  roleId: string;
  roleUsers: RoleUsers;
  //claims?: Claims;
  //style?:React.CSSProperties,
}) {
  //const { claims } = props;
  const userIds = props.roleUsers
    .filter((x) => x.roleId === props.roleId)
    .map((x) => x.id)
    .toSet();

  const users = props.roleUsers.filter((x) => userIds.has(x.id)).toList();

  return (
    <div 
      style={{
        display: "flex",
        flexWrap: "wrap",
        //...props.style
      }}
    >
      {users.toList().map((x) => (
        <div 
          className="p-1"
          key={x.id}
        >
            {x.id}
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
