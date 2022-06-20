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
  lock: Lock;
}):Fn => {
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const roleGroup = RoleGroup(payload)
      if(await props.store.roleGroup.find(payload)){
        return new Error(ErrorKind.RoleGroupAlreadyExist)
      }
      const insertErr = await props.store.roleGroup.insert(roleGroup)
      if(insertErr instanceof Error) { return insertErr }
      return roleGroup 
    })
  }
}

export default Fn
