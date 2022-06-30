import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { System } from "@csea/core/system";

export type Payload = {
  id: string;
  token?:string;
};

export type Fn = (payload: Payload) => Promise<System | Error>
export const Fn = (props: {
  store: Store;
  auth?: Auth;
}):Fn => {
  return async (req: Payload) => {
    const claims = await props.auth?.verify(req);
    if (claims instanceof Error) {
      return claims;
    }
    const system = await props.store.system.find(req)
    if(system instanceof Error) { return system }
    if(system === undefined) { return new Error(ErrorKind.SystemNotFound) }
    return system
  }
}

export default Fn
