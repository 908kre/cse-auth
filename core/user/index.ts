import ErrorKind from "@csea/core/error";

export type User = {
  id: string;
  name: string;
  groupId: string;
  post: string;
};

export const User = (args?: {
  id?: string;
  name?: string;
  groupId?: string;
  post?: string;
}): User => {
  const id = args?.id ?? "";
  const name = args?.name ?? "";
  const groupId = args?.groupId ?? "";
  const post = args?.groupId ?? "";
  return {
    id,
    name,
    groupId,
    post,
  };
};
export default User;
