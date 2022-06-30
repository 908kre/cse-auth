import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { Role } from "@csea/core/role";

export type Payload = {
  name?: string;
  systemId?: string;
  token?: string;
};

export type Fn = (payload: Payload) => Promise<Role | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
  auth?: Auth;
}):Fn => {
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const claims = await props.auth?.verify(payload);
      if (claims instanceof Error) {
        return claims;
      }
      const role = Role(payload)
      const valErr = role.validate()
      if(valErr instanceof Error) { return valErr }
      if(await props.store.role.find({name: payload.name, systemId: payload.systemId})){
        return new Error(ErrorKind.RoleAlreadyExist)
      }
      const insertErr = await props.store.role.insert(role)
      if(insertErr instanceof Error) { return insertErr }
      return role 
    })
  }
}

export default Fn
