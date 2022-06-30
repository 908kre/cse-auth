import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { RoleUser } from "@csea/core/roleUser";

export type Payload = {
  userId: string;
  roleId: string;
  token?: string;
};

export type Fn = (payload: Payload) => Promise<RoleUser | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
  auth?: Auth;
}):Fn => {
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const claims = await props.auth?.verify(payload);
      if (claims instanceof Error) {
        return claims;
      }
      const roleUser = RoleUser(payload)
      if(await props.store.roleUser.find(payload)){
        return new Error(ErrorKind.RoleUserAlreadyExist)
      }
      const insertErr = await props.store.roleUser.insert(roleUser)
      if(insertErr instanceof Error) { return insertErr }
      return roleUser 
    })
  }
}

export default Fn
