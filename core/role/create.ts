import { Lock, ErrorKind, Store } from "@csea/core";
import { Role } from "@csea/core/role";

export type Payload = {
  id?: string;
  name?: string;
  code?: string;
  systemId?: string;
  charge?: string;
};

export type Fn = (payload: Payload) => Promise<Role | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const role = Role(payload)
      const insertErr = await props.store.role.insert(role)
      if(insertErr instanceof Error) { return insertErr }
      return role 
    })
  }
}

export default Fn
