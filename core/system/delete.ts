import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { System } from "@csea/core/system";
import FindFn from "@csea/core/system/find";

export type Payload = {
  id: string;
  token?:string
};

export type Fn = (payload: Payload) => Promise<void | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
  auth?: Auth;
}):Fn => {
  const find = FindFn(props)
  return async (req: Payload) => {
    const claims = await props.auth?.verify(req);
    if (claims instanceof Error) {
      return claims;
    }
    return await props.lock.auto(async () => {
      const claims = await props.auth?.verify(req);
      if (claims instanceof Error) {
        return claims;
      }
      const system = await find(req)
      if(system instanceof Error) { return system }
      const roles =  await props.store.role.filter({systemId: system.id})

      if(roles instanceof Error) { return roles }

      for(const r of roles){
        const users = await props.store.roleUser.filter({roleId: r.id})
        if(users instanceof Error){ return users }
        const groups = await props.store.roleGroup.filter({roleId: r.id})
        if(groups instanceof Error){ return groups }
        for(const u of users){
          await props.store.roleUser.delete({userId: u.userId, roleId: u.roleId})
        }
        for(const g of groups){
          await props.store.roleGroup.delete({groupId: g.groupId, roleId: g.roleId, post: g.post})
        }
        await props.store.role.delete({id: r.id })
      }

      let err = await props.store.system.delete(system)
      if(err instanceof Error){ return err}
    })
  }
}

export default Fn
