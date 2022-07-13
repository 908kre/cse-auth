import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { Maintainer } from "@csea/core/maintainer";

export type Payload = {
  token?: string;
};

export type Fn = (payload: Payload) => Promise<Maintainer[] | Error>
export const Fn = (props: {
  store: Store;
  auth?: Auth;
}):Fn => {
  return async (payload: Payload) => {
    const claims = await props.auth?.verify(payload);
    if (claims instanceof Error) {
      return claims;
    }
    const roleUsers = await props.store.maintainer.filter(payload)
    if(roleUsers instanceof Error){return roleUsers}
    return roleUsers
  }
}

export default Fn
