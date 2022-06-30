import { UserStore, Auth } from "..";
import { User } from ".";

export type SetAdminFn = (req: {
  id: string;
  token?: string;
}) => Promise<void | Error>;

export const SetAdminFn = (props: {
  store: {
    user: UserStore;
  };
  auth?: Auth;
}): SetAdminFn => {
  return async (req) => {
    const claims = await props.auth?.verify(req);
    if (claims instanceof Error) {
      return claims;
    }
    const err = await props.store.user.isAdmin(req);
    if (err instanceof Error) { return err }
    if(err === true){
      return await props.store.user.delete(req);
    }else{
      return await props.store.user.insert(req);
    }
  };
};
