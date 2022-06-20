import ErrorKind from "@csea/core/error";
export { default as CreateFn } from "@csea/core/system/create";
export { default as UpdateFn } from "@csea/core/system/update";
export { default as FindFn } from "@csea/core/system/find";
export { default as FilterFn } from "@csea/core/system/filter";
export { default as DeleteFn } from "@csea/core/system/delete";

export type System = {
  id: string;
  name: string;
  createdAt: Date;
  validate: () => void | Error;
};

export const System = (args?: {
  id?: string;
  name?: string;
  createdAt?: Date;
}): System => {
  const id = args?.id ?? "";
  const name = args?.name ?? "";
  const createdAt = args?.createdAt ?? new Date();
  const validate = () => {
    if (id === "") {
      return new Error(ErrorKind.InvalidSystemIdFormat);
    }
  };
  const self = {
    id,
    name,
    createdAt,
    validate,
  };
  return self;
};
export default System;
