import { Lock, ErrorKind, Store } from "@csea/core";
import { Role } from "@csea/core/role";

export type Payload = {
  systemId?:string
};

export type Fn = (payload: Payload) => Promise<Role[] | Error>
export const Fn = (props: {
  store: Store;
}):Fn => {
  return async (payload: Payload) => {
    const roles = await props.store.role.filter(payload)
    if(roles instanceof Error){return roles}
    return roles
  }
}

export default Fn
