import { Lock, ErrorKind, Store } from "@csea/core";
import { RoleGroup } from "@csea/core/roleGroup";
import FindFn from "@csea/core/roleGroup/find";

export type Payload = {
  groupId: string;
  roleId: string;
  post: string;
};

export type Fn = (payload: Payload) => Promise<void | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  const find = FindFn(props)
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const roleGroup = await find(payload)
      if(roleGroup instanceof Error) { return roleGroup }
      let err = await props.store.roleGroup.delete(payload)
      if(err instanceof Error){ return err}
    })
  }
}

export default Fn
