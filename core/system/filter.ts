import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { System } from "@csea/core/system";
import { Admin } from "@csea/core/auth";
import { uniq } from "lodash";

export type Payload = {
  ids?: string[];
  token?:string;
};

export type Fn = (payload: Payload) => Promise<System[] | Error>
export const Fn = (props: {
  store: Store;
  auth?: Auth;
}):Fn => {
  return async (req: Payload) => {
    const claims = await props.auth?.verify(req);
    if (claims instanceof Error) {
      return claims;
    }
    if (claims === undefined || (claims && claims.admin === Admin.Owner)) {
      const systems = await props.store.system.filter(req)
      if(systems instanceof Error){return systems}
      return systems
    }

    const roleUsers = await props.store.roleUser.filter({userId: claims.userId})
    if(roleUsers instanceof Error){return roleUsers}
    const roleGroups = await props.store.roleGroup.filter({groupId: claims.groupId, post: claims.post})
    if(roleGroups instanceof Error){return roleGroups}
    const uIds = roleUsers.map(x => x.roleId)
    const gIds = roleGroups.map(x => x.roleId)
    const ids = uniq([...uIds, ...gIds])

    const roles = await props.store.role.filter({ids: ids})
    if(roles instanceof Error){return roles}
    const systemIds = uniq(roles.map(x => x.systemId))
    const systems = await props.store.system.filter({ids: systemIds})
    if(systems instanceof Error){return systems}
    return systems
  }
}

export default Fn
