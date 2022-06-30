import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { System } from "@csea/core/system";

export type Payload = {
  ids?: string[];
  token?:string;
};

export type Fn = (payload: Payload) => Promise<System[] | Error>
export const Fn = (props: {
  store: Store;
  auth?: Auth;
}):Fn => {
  return async (req: Payload) => {
    const claims = await props.auth?.verify(req);
    if (claims instanceof Error) {
      return claims;
    }
    if (claims === undefined || (claims && claims.admin === true)) {
      const systems = await props.store.system.filter(req)
      if(systems instanceof Error){return systems}
      return systems
    }
    
    const systems = await props.store.system.filter(req)
    if(systems instanceof Error){return systems}
    return systems
  }
}

export default Fn
