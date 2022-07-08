import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { System } from "@csea/core/system";
import { Admin } from "@csea/core/auth";

export type Payload = {
  id?: string;
  name?: string;
  token?: string;
};

export type Fn = (payload: Payload) => Promise<System | Error>
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
      if (claims !== undefined && claims.admin !== Admin.Owner) {
        return new Error(ErrorKind.PermissionDenied)
      }
      const system = System(payload)
      const valErr = system.validate()
      if(valErr instanceof Error) { return valErr }
      if(await props.store.system.find(payload)){
        return new Error(ErrorKind.SystemAlreadyExist)
      }
      const insertErr = await props.store.system.insert(system)
      if(insertErr instanceof Error) { return insertErr }
      return system 
    })
  }
}

export default Fn
