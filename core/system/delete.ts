import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { System } from "@csea/core/system";
import FindFn from "@csea/core/system/find";

export type Payload = {
  id: string;
  token?:string
};

export type Fn = (payload: Payload) => Promise<void | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
  auth?: Auth;
}):Fn => {
  const find = FindFn(props)
  return async (req: Payload) => {
    const claims = await props.auth?.verify(req);
    if (claims instanceof Error) {
      return claims;
    }
    return await props.lock.auto(async () => {
      const claims = await props.auth?.verify(req);
      if (claims instanceof Error) {
        return claims;
      }
      const system = await find(req)
      if(system instanceof Error) { return system }
      let err = await props.store.system.delete(system)
      if(err instanceof Error){ return err}
    })
  }
}

export default Fn
