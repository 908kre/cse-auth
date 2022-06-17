import { Lock, ErrorKind, Store } from "@csea/core";
import { RoleUser } from "@csea/core/roleUser";
import FindFn from "@csea/core/roleUser/find";

export type Payload = {
  id: string;
};

export type Fn = (payload: Payload) => Promise<void | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  const find = FindFn(props)
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const roleUser = await find(payload)
      if(roleUser instanceof Error) { return roleUser }
      let err = await props.store.roleUser.delete({id: payload.id})
      if(err instanceof Error){ return err}
    })
  }
}

export default Fn
