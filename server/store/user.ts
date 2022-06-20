import { UserStore } from "@csea/core";
import { User } from "@csea/core/user";

export const Store = (): UserStore => {
  const find = async (payload: { id: string; password: string }) => {
    return User({
      id: "AAA111633",
      name: "higuchi fumito",
      groupId: "1490",
      post: "0000",
      admin: true,
    });
  };
  const update = async (payload: { id: string; admin: boolean }) => {
    return User({
      id: "AAA111633",
      name: "higuchi fumito",
      groupId: "1490",
      post: "0000",
      admin: true,
    });
  };
  return {
    find,
    update,
  };
};
export default Store;
