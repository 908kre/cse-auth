import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { Maintainer } from "@csea/core/maintainer";

export type Payload = {
  id: string;
  systemId: string;
  token?: string;
};

export type Fn = (payload: Payload) => Promise<Maintainer | Error>
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
      if (claims !== undefined && claims.admin !== true) {
        return new Error(ErrorKind.PermissionDenied)
      }
      const maintainer = Maintainer(payload)
      const valErr = maintainer.validate()
      if(valErr instanceof Error) { return valErr }
      if(await props.store.maintainer.find(payload)){
        return new Error(ErrorKind.MaintainerAlreadyExist)
      }
      const insertErr = await props.store.maintainer.insert(maintainer)
      if(insertErr instanceof Error) { return insertErr }
      return maintainer 
    })
  }
}

export default Fn
