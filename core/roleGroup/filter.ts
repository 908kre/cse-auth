import { Lock, ErrorKind, Store } from "@csea/core";
import { RoleGroup } from "@csea/core/roleGroup";

export type Payload = {
};

export type Fn = (payload: Payload) => Promise<RoleGroup[] | Error>
export const Fn = (props: {
  store: Store;
}):Fn => {
  return async (payload: Payload) => {
    const roleGroups = await props.store.roleGroup.filter(payload)
    if(roleGroups instanceof Error){return roleGroups}
    return roleGroups
  }
}

export default Fn
