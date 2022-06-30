import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { RoleGroup } from "@csea/core/roleGroup";

export type Payload = {
  roleId?: string
  groupId?:string;
  token?: string;
};

export type Fn = (payload: Payload) => Promise<RoleGroup[] | Error>
export const Fn = (props: {
  store: Store;
  auth?: Auth;
}):Fn => {
  return async (payload: Payload) => {
    const claims = await props.auth?.verify(payload);
    if (claims instanceof Error) {
      return claims;
    }
    const roleGroups = await props.store.roleGroup.filter(payload)
    if(roleGroups instanceof Error){return roleGroups}
    return roleGroups
  }
}

export default Fn
