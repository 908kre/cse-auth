import React from 'react';
import { RoleGroup} from "@csea/core/roleGroup";

export const GroupTags = (props: {
  roleGroups: RoleGroup[];
}) => {
  return (
    <div style={{ display:"flex", flexDirection: "row"}}
    >
      {
        props.roleGroups.map( x => (
          <div className="tags has-addons m-1"
            style={{ 
              display: "flex",
              flexWrap: "nowrap",
            }}
          >
            <span className= 'tag'>{x.groupId}</span>
            <span className= 'tag is-info'>{x.post}</span>
          </div>
        )) 
      }
    </div>
  );
};

export default GroupTags;
