import { Lock, ErrorKind, Store } from "@csea/core";
import { System } from "@csea/core/system";

export type Payload = {
  id: string;
};

export type Fn = (payload: Payload) => Promise<System | Error>
export const Fn = (props: {
  store: Store;
}):Fn => {
  return async (payload: Payload) => {
    const system = await props.store.system.find(payload)
    if(system instanceof Error) { return system }
    if(system === undefined) { return new Error(ErrorKind.SystemNotFound) }
    return system
  }
}

export default Fn
