import ErrorKind from "@csea/core/error";

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
export default User;
