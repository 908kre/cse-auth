import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { Owner } from "@csea/core/user";

export type Payload = {
  id: string;
  token?: string;
};

export type Fn = (payload: Payload) => Promise<Owner| undefined | Error>
export const Fn = (props: {
  store: Store;
  auth?: Auth;
}):Fn => {
  return async (payload: Payload) => {
    const claims = await props.auth?.verify(payload);
    if (claims instanceof Error) {
      return claims;
    }
    const owner = await props.store.user.findOwner(payload)
    if(owner instanceof Error) { return owner }
    return owner
  }
}

export default Fn
