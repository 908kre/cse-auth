import { Lock, ErrorKind, Claims, Store, Auth, Crypt, Logger, ReqFn, ReqKind } from ".";
import { uniq } from "lodash";

export type SignInFn = (req: {
  id: string;
  password: string;
}) => Promise<string | Error>;
export const SignInFn = (
  props: { 
    auth: Auth; 
    store: Store, 
    logger?:Logger 
  }
): SignInFn => {
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
      groupId: user.groupId,
      post: user.post,
      roles: roles,
      admin: user.admin
    };
    const token = await props.auth.sign(claims);
    if(token instanceof Error){
      return token
    }
    props.logger?.info({

    })
    return token
  }
};

export const SignIn = (
  props: { 
    auth: Auth; 
    store: Store, 
    logger?:Logger 
    kind: ReqKind.SignIn
  }
):ReqFn<ReqKind.SignIn> => {
  const { kind } = props
  const run = async (req) => {
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
      groupId: user.groupId,
      post: user.post,
      roles: roles,
      admin:user.admin
    };
    const token = await props.auth.sign(claims);
    if(token instanceof Error){
      return token
    }
    props.logger?.info({
      kind,
      user,
    })
    return token
  }
  return {
    run,
    kind
  }
};
