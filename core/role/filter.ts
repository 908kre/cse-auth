import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { Role } from "@csea/core/role";
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
    if (claims === undefined || (claims && claims.admin === true)) {
      const roles = await props.store.role.filter(payload)
      if(roles instanceof Error){return roles}
      return roles
    }
    const roleUser = await props.store.roleUser.filter({userId: claims.userId})
    if(roleUser instanceof Error){return roleUser}
    const roleGroup = await props.store.roleGroup.filter({groupId: claims.groupId, post: claims.post})
    if(roleGroup instanceof Error){return roleGroup}
    const maintainers = await props.store.maintainer.filter({id:claims.userId ?? ""})
    if(maintainers instanceof Error){return maintainers}
    const systemIds = maintainers.map(x => x.systemId)
    const rows = await props.store.role.filter({systemIds: systemIds})
    return rows
  }
}

export default Fn
