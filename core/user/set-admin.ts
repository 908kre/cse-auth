import { UserStore, Auth } from "..";
import { User } from ".";

export type SetAdminFn = (req: {
  id: string;
  token?: string;
}) => Promise<User | Error>;

export const SetAdminFn = (props: {
  store: {
    user: UserStore;
  };
  auth?: Auth;
}): SetAdminFn => {
  return async (req) => {
    const claims = await props.auth?.verify(req.token);
    if (claims instanceof Error) {
      return claims;
    }
    return await props.store.user.update(req);
  };
};
