import { ErrorKind } from "@csea/core";

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
