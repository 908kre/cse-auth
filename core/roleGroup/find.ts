import { Lock, ErrorKind, Store } from "@csea/core";
import { RoleGroup } from "@csea/core/roleGroup";

export type Payload = {
  groupId: string;
  roleId: string;
  post: string;
};

export type Fn = (payload: Payload) => Promise<RoleGroup | Error>
export const Fn = (props: {
  store: Store;
}):Fn => {
  return async (payload: Payload) => {
    const roleGroup = await props.store.roleGroup.find(payload)
    if(roleGroup instanceof Error) { return roleGroup }
    if(roleGroup === undefined) { return new Error(ErrorKind.RoleGroupNotFound) }
    return roleGroup 
  }
}

export default Fn
