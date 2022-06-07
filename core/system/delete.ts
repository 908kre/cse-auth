import { Lock, ErrorKind, Store } from "@csea/core";
import { System } from "@csea/core/system";
import FindFn from "@csea/core/system/find";

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
      const system = await find(payload)
      if(system instanceof Error) { return system }
      let err = await props.store.system.delete({id: payload.id})
      if(err instanceof Error){ return err}
    })
  }
}

export default Fn
