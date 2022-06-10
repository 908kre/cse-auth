import { Lock, ErrorKind, Store } from "@csea/core";
import { System } from "@csea/core/system";

export type Payload = {
  ids?: string[];
};

export type Fn = (payload: Payload) => Promise<System[] | Error>
export const Fn = (props: {
  store: Store;
}):Fn => {
  return async (payload: Payload) => {
    const systems = await props.store.system.filter(payload)
    if(systems instanceof Error){return systems}
    return systems
  }
}

export default Fn
