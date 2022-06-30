import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { RoleUser } from "@csea/core/roleUser";
import FindFn from "@csea/core/roleUser/find";

export type Payload = {
  userId: string;
  roleId: string;
  token?: string;
};

export type Fn = (payload: Payload) => Promise<void | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
  auth?: Auth;
}):Fn => {
  const find = FindFn(props)
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const claims = await props.auth?.verify(payload);
      if (claims instanceof Error) {
        return claims;
      }
      const roleUser = await find(payload)
      if(roleUser instanceof Error) { return roleUser }
      let err = await props.store.roleUser.delete(payload)
      if(err instanceof Error){ return err}
    })
  }
}

export default Fn
