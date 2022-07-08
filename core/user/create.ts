import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { System } from "@csea/core/system";
import { Admin } from "@csea/core/auth";
import { Owner } from "@csea/core/user";

export type Payload = {
  id: string;
  level: Admin;
  token?: string;
};

export type Fn = (payload: Payload) => Promise<Owner | Error>
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
      const owner = Owner(payload)
      const valErr = owner.validate()
      if(valErr instanceof Error) { return valErr }
      if(await props.store.user.findOwner(payload)){
        return new Error(ErrorKind.SystemAlreadyExist)
      }
      const insertErr = await props.store.user.insert(owner)
      if(insertErr instanceof Error) { return insertErr }
      return owner
    })
  }
}

export default Fn
