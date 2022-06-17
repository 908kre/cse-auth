import React from "react";
import { Role, Roles, System, Systems } from "../../models"


export default function SystemTags(props: {
  //systemId: string;
  roleId: string;
  rolesysId: string
  systems: Systems;
  roles: Roles;
  style?:React.CSSProperties,
}) {
  const systemIds = props.systems
    .filter((x)=> x.id === props.rolesysId)
    .map((x) => x.id)
    .toSet();

  const systems = props.systems.filter((x) => systemIds.has(x.id)).toList();

  return (
    <div 
      style={{
        display: "flex",
        flexWrap: "wrap",
        ...props.style
      }}
    >
      {systems.toList().map((x) => (
        <div 
          className="p-1"
          key={x.id}
        >
          {x.name}
        </div>
        
      ))}
    </div>
    
  );
}
