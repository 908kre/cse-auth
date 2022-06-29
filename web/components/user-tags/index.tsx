import React from 'react';
import { RoleUser} from "@csea/core/roleUser";

export const UserTags = (props: {
  roleUsers: RoleUser[];
}) => {
  return (
    <div style={{ display:"flex", flexDirection: "row"}}
    >
      {
        props.roleUsers.map( x => (
          <div className= 'tag m-1'>
            {x.userId}
          </div>
        )) 
      }
    </div>
  );
};

export default UserTags;
