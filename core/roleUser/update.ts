import { Lock, ErrorKind, Store } from "@csea/core";
import { RoleUser } from "@csea/core/roleUser";

export type Payload = {
  id: string;
  roleId: string;
};

export type Fn = (payload: Payload) => Promise<RoleUser | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const roleUser = await props.store.roleUser.find(payload)
      if(roleUser instanceof Error) { return roleUser }
      if(roleUser === undefined) { return new Error(ErrorKind.RoleUserNotFound) }
      const newRoleUser = RoleUser({
        ...roleUser,
        roleId: payload.roleId,
      })
      const updateErr = await props.store.roleUser.update(newRoleUser);
      if (updateErr instanceof Error) { return updateErr; }
      return newRoleUser 
    })
  }
}

export default Fn
