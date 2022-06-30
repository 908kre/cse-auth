import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { RoleGroup } from "@csea/core/roleGroup";

export type Payload = {
  groupId: string;
  roleId: string;
  post: string;
  token?: string;
};

export type Fn = (payload: Payload) => Promise<RoleGroup | Error>
export const Fn = (props: {
  store: Store;
  auth?: Auth;
}):Fn => {
  return async (payload: Payload) => {
    const claims = await props.auth?.verify(payload);
    if (claims instanceof Error) {
      return claims;
    }
    const roleGroup = await props.store.roleGroup.find(payload)
    if(roleGroup instanceof Error) { return roleGroup }
    if(roleGroup === undefined) { return new Error(ErrorKind.RoleGroupNotFound) }
    return roleGroup 
  }
}

export default Fn
