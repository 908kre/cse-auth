import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { System } from "@csea/core/system";
import FindFn from "@csea/core/role/find";

export type Payload = {
  id: string;
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
      const role = await find(payload)
      if(role instanceof Error) { return role }
      const users = await props.store.roleUser.filter({roleId: payload.id})
      if(users instanceof Error){ return users }
      const groups = await props.store.roleGroup.filter({roleId: payload.id})
      if(groups instanceof Error){ return groups }
      for(const u of users){
        await props.store.roleUser.delete({userId: u.userId, roleId: u.roleId})
      }
      for(const g of groups){
        await props.store.roleGroup.delete({groupId: g.groupId, roleId: g.roleId, post: g.post})
      }
      let err = await props.store.role.delete({id: payload.id})
      if(err instanceof Error){ return err}
    })
  }
}

export default Fn
