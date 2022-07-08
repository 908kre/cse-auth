import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { RoleGroup } from "@csea/core/roleGroup";
import FindFn from "@csea/core/user/find-owner";

export type Payload = {
  id:string;
  token?: string;
};

export type Fn = (payload: Payload) => Promise<void | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
  auth?: Auth;
}):Fn => {
  const find = FindFn(props)
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const claims = await props.auth?.verify(payload);
      if (claims instanceof Error) {
        return claims;
      }
      const owner = await find(payload)
      if(owner instanceof Error) { return owner }
      let err = await props.store.user.delete(payload)
      if(err instanceof Error){ return err}
    })
  }
}

export default Fn
