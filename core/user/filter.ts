import { Lock, ErrorKind, Store } from "@csea/core";
import { Owner } from "@csea/core/user";

export type Payload = {
};

export type Fn = (payload: Payload) => Promise<Owner[] | Error>
export const Fn = (props: {
  store: Store;
}):Fn => {
  return async (payload: Payload) => {
    const users = await props.store.user.filter(payload)
    if(users instanceof Error){return users}
    return users
  }
}

export default Fn
