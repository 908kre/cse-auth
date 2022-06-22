import { v4 as uuid } from "uuid";
import ErrorKind from "@csea/core/error";
export { default as CreateFn } from "@csea/core/role/create";
export { default as UpdateFn } from "@csea/core/role/update";
export { default as FindFn } from "@csea/core/role/find";
export { default as FilterFn } from "@csea/core/role/filter";
export { default as DeleteFn } from "@csea/core/role/delete";

export type Role = {
  id: string;
  systemId: string;
  createdAt: Date;
  validate: () => void | Error;
};

export const Role = (args?: {
  id?: string;
  systemId?: string;
  createdAt?: Date;
}): Role => {
  const id = args?.id ?? "";
  const systemId = args?.systemId ?? "";
  const createdAt = args?.createdAt ?? new Date();
  const validate = () => {
    if (id === "") {
      return new Error(ErrorKind.InvalidRoleIdFormat);
    }
  };
  return {
    id,
    systemId,
    createdAt,
    validate,
  };
};
export default Role;
