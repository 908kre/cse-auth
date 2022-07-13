import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { System } from "@csea/core/system";
import { uniq } from "lodash";

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
    const maintainers = await props.store.maintainer.filter({id:claims.userId ?? ""})
    if(maintainers instanceof Error){return maintainers}
    const systemIds = maintainers.map(x => x.systemId)
    const systems = await props.store.system.filter({ids: systemIds})
    if(systems instanceof Error){return systems}
    return systems
  }
}

export default Fn
