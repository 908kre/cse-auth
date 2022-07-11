import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { Owner } from "@csea/core/user";
import { Admin } from "@csea/core/auth";
import FindFn from "@csea/core/user/find-owner";

export type Payload = {
  id: string;
  level: Admin;
  token?:string
};

export type Fn = (payload: Payload) => Promise<Owner | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
  auth?: Auth;
}):Fn => {
  return async (payload: Payload) => {
    const claims = await props.auth?.verify(payload);
    if (claims instanceof Error) {
      return claims;
    }
    return await props.lock.auto(async () => {
      const owner = await props.store.user.findOwner(payload)
      if(owner instanceof Error) { return owner }
      if(owner === undefined) { return new Error(ErrorKind.OwnerNotFound) }
      const newOwner = Owner({
        ...owner,
        level: payload.level,
      })
      const valErr = newOwner.validate()
      if(valErr instanceof Error){return valErr}
      const updateErr = await props.store.user.update(newOwner);
      if (updateErr instanceof Error) { return updateErr; }
      return newOwner 
    })
  }
}

export default Fn
