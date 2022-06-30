import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { Role } from "@csea/core/role";

export type Payload = {
  systemId?:string
  token?: string;
};

export type Fn = (payload: Payload) => Promise<Role[] | Error>
export const Fn = (props: {
  store: Store;
  auth?: Auth;
}):Fn => {
  return async (payload: Payload) => {
    const claims = await props.auth?.verify(payload);
    if (claims instanceof Error) {
      return claims;
    }
    const roles = await props.store.role.filter(payload)
    if(roles instanceof Error){return roles}
    return roles
  }
}

export default Fn
