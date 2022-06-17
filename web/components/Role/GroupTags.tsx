import React from "react";
import { RoleGroup, RoleGroups } from "../../models"


export default function GroupTags(props: {
  roleId: string;
  roleGroups: RoleGroups;
  //claims?: Claims;
  //style?:React.CSSProperties,
}) {
  //const { claims } = props;
  const groupIds = props.roleGroups
    .filter((x) => x.roleId === props.roleId)
    .map((x) => x.id)
    .toSet();

  const groups = props.roleGroups.filter((x) => groupIds.has(x.id)).toList();

  return (
    <div 
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {groups.toList().map((x) => (
        <div 
          className="p-1"
          key={x.id}
        >
            {x.id}
        </div>
      ))}
    </div>
  );
}
