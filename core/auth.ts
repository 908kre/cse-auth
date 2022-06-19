import { Lock, ErrorKind, Claims, Store, Auth, Crypt } from ".";
import { uniq } from "lodash";

export type SignInPayload = {
  id: string;
  password: string;
};
export type SignInFn = (req: SignInPayload) => Promise<string | Error>;
export const SignInFn = (props: { auth: Auth; store: Store }): SignInFn => {
  return async (req) => {
    const user = await props.store.user.find(req);
    if (user instanceof Error) {
      return user;
    }
    const userRoles = await props.store.roleUser.filter({ userId: req.id });
    if (userRoles instanceof Error) {
      return userRoles;
    }
    const groupRoles = await props.store.roleGroup.filter({
      groupId: user.groupId,
    });
    if (groupRoles instanceof Error) {
      return groupRoles;
    }
    const us = userRoles.map((x) => x.roleId);
    const gs = groupRoles.map((x) => x.roleId);

    const roles = uniq([...us, ...gs]);

    const claims: Claims = {
      exp: Math.floor(Date.now() / 1000) + 24 * (60 * 60),
      userId: user.id,
      roles: roles,
    };
    return await props.auth.sign(claims);
  }
};
