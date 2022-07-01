import ErrorKind from "@csea/core/error";
export { default as FilterFn } from "@csea/core/user/filter";
export { SetAdminFn } from "@csea/core/user/set-admin";


export type User = {
  id: string;
  name: string;
  groupId: string;
  post: string;
  admin: boolean;
};

export const User = (args?: {
  id?: string;
  name?: string;
  groupId?: string;
  post?: string;
  admin?: boolean;
}): User => {
  const id = args?.id ?? "";
  const name = args?.name ?? "";
  const groupId = args?.groupId ?? "";
  const post = args?.groupId ?? "";
  const admin = args?.admin ?? false;
  return {
    id,
    name,
    groupId,
    post,
    admin,
  };
};

export type Owner = {
  id: string;
  validate: () => void | Error;
};

export const Owner = (args?: {
  id?: string;
}): Owner => {
  const id = args?.id ?? "";
  const validate = () => {
    if (id === "") {
      return new Error(ErrorKind.InvalidOwnerIdFormat);
    }
  };
  return {
    id,
    validate
  };
};

export default User;
