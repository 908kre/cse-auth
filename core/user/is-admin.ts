import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { Owner } from "@csea/core/user";

export type Payload = {
  id: string;
  token?: string;
};

export type Fn = (payload: Payload) => Promise<boolean | Error>
export const Fn = (props: {
  store: Store;
  auth?: Auth;
}):Fn => {
  return async (payload: Payload) => {
    const claims = await props.auth?.verify(payload);
    if (claims instanceof Error) {
      return claims;
    }
    const owner = await props.store.user.isAdmin(payload)
    if(owner instanceof Error) { return owner }
    if(owner === undefined) { return  false}
    return true
  }
}

export default Fn
