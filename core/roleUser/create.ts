import { Lock, ErrorKind, Store } from "@csea/core";
import { RoleUser } from "@csea/core/roleUser";

export type Payload = {
  id?: string;
  roleId?: string;
};

export type Fn = (payload: Payload) => Promise<RoleUser | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const roleUser = RoleUser(payload)
      const insertErr = await props.store.roleUser.insert(roleUser)
      if(insertErr instanceof Error) { return insertErr }
      return roleUser 
    })
  }
}

export default Fn
