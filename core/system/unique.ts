import { ErrorKind, Store } from "@csea/core";
import { System } from "@csea/core/system";
import FindFn from "@csea/core/system/find";

export type UniqueFn = (system:System) => Promise<void | Error>
export const UniqueFn = (props: {
  store: Store
}) => {
  return async (system: System):Promise<void | Error> => {
    const row = await props.store.system.find({code: system.code})
    if(row instanceof Error) { return row }
    if(row?.id !== system.id && row?.name === system.name ){
      return new Error(ErrorKind.SystemAlreadyExist)
    }
  }
}
export default UniqueFn
