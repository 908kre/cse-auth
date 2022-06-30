import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { RoleUser } from "@csea/core/roleUser";

export type Payload = {
  userId?:string;
  roleId?:string
  token?: string;
};

export type Fn = (payload: Payload) => Promise<RoleUser[] | Error>
export const Fn = (props: {
  store: Store;
  auth?: Auth;
}):Fn => {
  return async (payload: Payload) => {
    const claims = await props.auth?.verify(payload);
    if (claims instanceof Error) {
      return claims;
    }
    const roleUsers = await props.store.roleUser.filter(payload)
    if(roleUsers instanceof Error){return roleUsers}
    return roleUsers
  }
}

export default Fn
