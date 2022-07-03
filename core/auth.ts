import { Lock, ErrorKind, Store, Auth, Crypt, Logger, ReqFn, ReqKind } from ".";
import { uniq } from "lodash";

export type Claims = {
  exp: number;
  userId: string;
  systemId?: string;
  groupId:string;
  post:string;
  roles: string[];
  admin: boolean;
};

export const Claims =  (props: Omit<Claims, "exp"|"roles"|"admin"> & {
  roles?:string[],
  admin?: boolean,
  exp?: number,
}):Claims => {
  const { userId, systemId, groupId, post } = props
  const  exp = props.exp ?? Math.floor(Date.now() / 1000) + 24 * (60 * 60)
  const admin = props.admin ?? false
  const roles = props.roles ?? []

  return {
    exp,
    userId,
    groupId,
    systemId,
    post,
    roles,
    admin,
  }
}

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
    const userRoles = await props.store.roleUser.filter({ 
      userId: req.id 
    });
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
    const roles = await props.store.role.filter({ids: uniq([...us, ...gs])})
    if (roles instanceof Error){
      return roles
    }
    const claims = Claims({
      userId: user.id,
      groupId: user.groupId,
      post: user.post,
      systemId: req.systemId,
      roles: roles.filter(x => x.systemId === req.systemId).map(x => x.name),
      admin:user.admin
    });
    const token = await props.auth.sign(claims);
    if(token instanceof Error){
      return token
    }
    props.logger?.info({
      kind,
      claims,
    })
    return token
  }
  return {
    run,
    kind
  }
};
