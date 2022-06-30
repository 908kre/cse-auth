import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { Owner } from "@csea/core/user";

export type Payload = {
  token?: string;
};

export type Fn = (payload: Payload) => Promise<Owner[] | Error>
export const Fn = (props: {
  store: Store;
  auth?: Auth;
}):Fn => {
  return async (payload: Payload) => {
    const claims = await props.auth?.verify(payload);
    if (claims instanceof Error) {
      return claims;
    }
    const users = await props.store.user.filter(payload)
    if(users instanceof Error){return users}
    return users
  }
}

export default Fn
