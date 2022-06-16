import { Lock, ErrorKind, Store } from "@csea/core";
import { RoleUser } from "@csea/core/roleUser";

export type Payload = {
  id: string;
};

export type Fn = (payload: Payload) => Promise<RoleUser | Error>
export const Fn = (props: {
  store: Store;
}):Fn => {
  return async (payload: Payload) => {
    const roleUser = await props.store.roleUser.find(payload)
    if(roleUser instanceof Error) { return roleUser }
    if(roleUser === undefined) { return new Error(ErrorKind.RoleUserNotFound) }
    return roleUser 
  }
}

export default Fn
