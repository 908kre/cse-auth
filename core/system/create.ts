import { Lock, ErrorKind, Store } from "@scea/core";
import { System } from "@scea/core/system";

export type Payload = {
  id?: string;
  name?: string;
  code?: string;
};

export type Fn = (payload: Payload) => Promise<System | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const system = System(payload)
      const valErr = system.validate()
      if(valErr instanceof Error) { return valErr }
      const insertErr = await props.store.system.insert(system)
      if(insertErr instanceof Error) { return insertErr }
      return system 
    })
  }
}

export default Fn
