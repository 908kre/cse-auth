import { Lock, ErrorKind, Store } from "@csea/core";
import { Role } from "@csea/core/role";
import FindFn from "@csea/core/role/find";

export type Payload = {
  id: string;
  name: string;
  code: string;
  systemId: string;
  charge: string;
};

export type Fn = (payload: Payload) => Promise<Role | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const role = await props.store.role.find(payload)
      if(role instanceof Error) { return role }
      if(role === undefined) { return new Error(ErrorKind.RoleNotFound) }
      const newRole = Role({
        ...role,
        name: payload.name,
        code:payload.code,
        systemId:payload.systemId,
        charge:payload.charge
      })
      const updateErr = await props.store.role.update(newRole);
      if (updateErr instanceof Error) { return updateErr; }
      return newRole 
    })
  }
}

export default Fn
