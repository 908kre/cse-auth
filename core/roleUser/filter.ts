import { Lock, ErrorKind, Store } from "@csea/core";
import { RoleUser } from "@csea/core/roleUser";

export type Payload = {
  userId?:string;
  roleId?:string
};

export type Fn = (payload: Payload) => Promise<RoleUser[] | Error>
export const Fn = (props: {
  store: Store;
}):Fn => {
  return async (payload: Payload) => {
    const roleUsers = await props.store.roleUser.filter(payload)
    if(roleUsers instanceof Error){return roleUsers}
    return roleUsers
  }
}

export default Fn
