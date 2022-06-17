import { Lock, ErrorKind, Store } from "@csea/core";
import { RoleGroup } from "@csea/core/roleGroup";

export type Payload = {
  id: string;
  roleId: string;
  post:number;
};

export type Fn = (payload: Payload) => Promise<RoleGroup | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const roleGroup = await props.store.roleGroup.find(payload)
      if(roleGroup instanceof Error) { return roleGroup }
      if(roleGroup === undefined) { return new Error(ErrorKind.RoleGroupNotFound) }
      const newRoleGroup = RoleGroup({
        ...roleGroup,
        roleId: payload.roleId,
        post:payload.post
      })
      const updateErr = await props.store.roleGroup.update(newRoleGroup);
      if (updateErr instanceof Error) { return updateErr; }
      return newRoleGroup 
    })
  }
}

export default Fn
