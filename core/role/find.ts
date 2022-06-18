import { Lock, ErrorKind, Store } from "@csea/core";
import { Role } from "@csea/core/role";

export type Payload = {
  id?: string;
  systemId?:string;
};

export type Fn = (payload: Payload) => Promise<Role | Error>
export const Fn = (props: {
  store: Store;
}):Fn => {
  return async (payload: Payload) => {
    const role = await props.store.role.find(payload)
    if(role instanceof Error) { return role }
    if(role === undefined) { return new Error(ErrorKind.RoleNotFound) }
    return role 
  }
}

export default Fn
