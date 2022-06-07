import { Lock, ErrorKind, Store } from "@csea/core";
import { System } from "@csea/core/system";
import FindFn from "@csea/core/system/find";

export type Payload = {
  id: string;
  name: string;
  code: string;
};

export type Fn = (payload: Payload) => Promise<System | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const system = await props.store.system.find(payload)
      if(system instanceof Error) { return system }
      if(system === undefined) { return new Error(ErrorKind.SystemNotFound) }
      const newSystem = System({
        ...system,
        name: payload.name,
        code:payload.code
      })
      const valErr = newSystem.validate()
      if(valErr instanceof Error){return valErr}
      const updateErr = await props.store.system.update(newSystem);
      if (updateErr instanceof Error) { return updateErr; }
      return newSystem 
    })
  }
}

export default Fn
