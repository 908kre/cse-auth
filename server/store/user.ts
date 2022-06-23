import { UserStore } from "@csea/core";
import { User } from "@csea/core/user";
import ErrorKind from "@csea/core/error";

export const Store = (): UserStore => {
  const find = async (payload: { id: string; password: string }) => {
    const { id, password } = payload
    if( id === 'test' && password === "test"){
      return User({
        id: "AAA111633",
        name: "higuchi fumito",
        groupId: "1490",
        post: "0000",
        admin: true,
      });
    }
    return new Error(ErrorKind.InvalidNameOrPassword)
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
