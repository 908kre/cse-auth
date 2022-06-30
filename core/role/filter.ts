import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { Role } from "@csea/core/role";
import { uniq } from "lodash";

export type Payload = {
  ids?:string[]
  systemId?:string
  token?: string;
};

export type Fn = (payload: Payload) => Promise<Role[] | Error>
export const Fn = (props: {
  store: Store;
  auth?: Auth;
}):Fn => {
  return async (payload: Payload) => {
    const claims = await props.auth?.verify(payload);
    if (claims instanceof Error) {
      return claims;
    }
    console.log(claims)
    if (claims === undefined || (claims && claims.admin === true)) {
      const roles = await props.store.role.filter(payload)
      if(roles instanceof Error){return roles}
      return roles
    }
    const roleUser = await props.store.roleUser.filter({userId: claims.userId})
    if(roleUser instanceof Error){return roleUser}
    const roleGroup = await props.store.roleGroup.filter({groupId: claims.groupId, post: claims.post})
    if(roleGroup instanceof Error){return roleGroup}
    console.log(roleUser)

    const uIds = roleUser.map(x => x.roleId)
    const gIds = roleGroup.map(x => x.roleId)
    const ids = uniq([...uIds, ...gIds])
    
    const roles = await props.store.role.filter({ids: ids})
    if(roles instanceof Error){return roles}
    return roles
  }
}

export default Fn
