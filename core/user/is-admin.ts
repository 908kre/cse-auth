import { Lock, ErrorKind, Store } from "@csea/core";
import { Owner } from "@csea/core/user";

export type Payload = {
  id: string;
};

export type Fn = (payload: Payload) => Promise<boolean | Error>
export const Fn = (props: {
  store: Store;
}):Fn => {
  return async (payload: Payload) => {
    const owner = await props.store.user.isAdmin(payload)
    if(owner instanceof Error) { return owner }
    if(owner === undefined) { return  false}
    return true
  }
}

export default Fn
