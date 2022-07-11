import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { Role } from "@csea/core/role";
import { Admin } from "@csea/core/auth";
import { uniq } from "lodash";

export type Payload = {
  ids?:string[]
  systemId?:string
  systemIds?:string[]
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
    if (claims === undefined || (claims && claims.admin === Admin.Owner)) {
      const roles = await props.store.role.filter(payload)
      if(roles instanceof Error){return roles}
      return roles
    }
    const roleUser = await props.store.roleUser.filter({userId: claims.userId})
    if(roleUser instanceof Error){return roleUser}
    const roleGroup = await props.store.roleGroup.filter({groupId: claims.groupId, post: claims.post})
    if(roleGroup instanceof Error){return roleGroup}

    const uIds = roleUser.map(x => x.roleId)
    const gIds = roleGroup.map(x => x.roleId)
    const ids = uniq([...uIds, ...gIds])
    
    const roles = await props.store.role.filter({ids: ids})
    if(roles instanceof Error){return roles}
    const systemIds = uniq(roles.map(x => x.systemId))
    const rows = await props.store.role.filter({systemIds: systemIds})
    return rows
  }
}

export default Fn
