import { ErrorKind } from "@csea/core";
export { default as CreateFn } from "@csea/core/maintainer/create";
export { default as FilterFn } from "@csea/core/maintainer/filter";
export { default as DeleteFn } from "@csea/core/maintainer/delete";

export type Maintainer = {
  id: string;
  systemId: string;
  validate: () => void | Error;
};

export const Maintainer = (args?: {
  id?: string;
  systemId?: string;
}): Maintainer => {
  const id = args?.id ?? "";
  const systemId = args?.systemId ?? "";
  const validate = () => {
    if (id === "" || systemId === "") {
      return new Error(ErrorKind.InvalidFormat);
    }
  };
  return {
    id,
    systemId,
    validate
  };
};

export default Maintainer;
