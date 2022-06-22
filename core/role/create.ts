import { Lock, ErrorKind, Store } from "@csea/core";
import { Role } from "@csea/core/role";

export type Payload = {
  id?: string;
  systemId?: string;
};

export type Fn = (payload: Payload) => Promise<Role | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const role = Role(payload)
      const valErr = role.validate()
      if(valErr instanceof Error) { return valErr }
      if(await props.store.role.find({id: payload.id, systemId: payload.systemId})){
        return new Error(ErrorKind.RoleAlreadyExist)
      }
      const insertErr = await props.store.role.insert(role)
      if(insertErr instanceof Error) { return insertErr }
      return role 
    })
  }
}

export default Fn
