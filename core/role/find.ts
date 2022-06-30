import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { Role } from "@csea/core/role";

export type Payload = {
  id?: string;
  name?: string;
  systemId?:string;
  token?: string;
};

export type Fn = (payload: Payload) => Promise<Role | Error>
export const Fn = (props: {
  store: Store;
  auth?: Auth;
}):Fn => {
  return async (payload: Payload) => {
    const claims = await props.auth?.verify(payload);
    if (claims instanceof Error) {
      return claims;
    }
    const role = await props.store.role.find(payload)
    if(role instanceof Error) { return role }
    if(role === undefined) { return new Error(ErrorKind.RoleNotFound) }
    return role 
  }
}

export default Fn
