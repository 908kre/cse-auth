import ErrorKind from "@csea/core/error";
import { Admin } from "@csea/core/auth";
export { default as FilterFn } from "@csea/core/user/filter";
export { default as CreateFn } from "@csea/core/user/create";
export { default as DeleteFn } from "@csea/core/user/delete";
export { default as UpdateFn } from "@csea/core/user/update";
export { SetAdminFn } from "@csea/core/user/set-admin";


export type User = {
  id: string;
  name: string;
  email: string;
  companyName: string;
  groupId: string;
  groupName: string;
  post: string;
  admin: Admin;
};

export const User = (args?: {
  id?: string;
  name?: string;
  email?: string;
  companyName?: string;
  groupId?: string;
  groupName?: string;
  post?: string;
  admin?: Admin;
}): User => {
  const id = args?.id ?? "";
  const name = args?.name ?? "";
  const email = args?.email ?? "";
  const companyName = args?.companyName ?? "";
  const groupId = args?.groupId ?? "";
  const groupName = args?.groupName ?? "";
  const post = args?.post ?? "";
  const admin = args?.admin ?? Admin.Guest;
  return {
    id,
    name,
    email,
    companyName,
    groupId,
    groupName,
    post,
    admin,
  };
};

export type Owner = {
  id: string;
  level: Admin;
  validate: () => void | Error;
};

export const Owner = (args?: {
  id?: string;
  level?:Admin;
}): Owner => {
  const id = args?.id ?? "";
  const level = args?.level ?? Admin.Guest;
  const validate = () => {
    if (id === "") {
      return new Error(ErrorKind.InvalidOwnerIdFormat);
    }
  };
  return {
    id,
    level,
    validate
  };
};

export default User;
