import { Lock, ErrorKind, Store, Auth } from "@csea/core";
import { RoleGroup } from "@csea/core/roleGroup";

export type Payload = {
  groupId: string;
  roleId: string;
  post: string;
  token?: string;
};

export type Fn = (payload: Payload) => Promise<RoleGroup | Error>
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
      const roleGroup = RoleGroup(payload)
      const valErr = roleGroup.validate()
      if(valErr instanceof Error) { return valErr }
      if(await props.store.roleGroup.find(payload)){
        return new Error(ErrorKind.RoleGroupAlreadyExist)
      }
      const insertErr = await props.store.roleGroup.insert(roleGroup)
      if(insertErr instanceof Error) { return insertErr }
      return roleGroup 
    })
  }
}

export default Fn
