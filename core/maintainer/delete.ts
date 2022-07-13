import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { Maintainer } from "@csea/core/maintainer";

export type Payload = {
  id: string;
  systemId: string;
  token?:string
};

export type Fn = (payload: Payload) => Promise<void | Error>
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
      const maintainer = await props.store.maintainer.find(payload)
      if(maintainer instanceof Error) { return maintainer }
      if(maintainer === undefined) { return new Error(ErrorKind.MaintainerNotFound) }
      let err = await props.store.maintainer.delete(payload)
      if(err instanceof Error){ return err }
    })
  }
}

export default Fn
