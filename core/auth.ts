import { Lock, ErrorKind, Store, Auth, Crypt, Logger, ReqFn, ReqKind } from ".";
import { uniq } from "lodash";

export enum Admin {
  Owner = 2,
  Maintainer = 1,
  Guest = 0,
}

export type Claims = {
  exp: number;
  userId: string;
  groupId:string;
  post:string;
  roles: string[];
  admin: Admin;
  name?:string;
  email?:string;
  companyName?:string;
  groupName?:string;
  systemId?: string;
};


export const Claims =  (props: Omit<Claims, "exp"|"roles"|"admin"> & {
  roles?:string[],
  admin?: Admin,
  exp?: number,
}):Claims => {
  const { userId, systemId, groupId, post } = props
  const  exp = props.exp ?? Math.floor(Date.now() / 1000) + 24 * (60 * 60)
  const admin = props.admin ?? Admin.Guest 
  const roles = props.roles ?? []

  return {
    exp,
    userId,
    groupId,
    systemId,
    post,
    roles,
    admin
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
      userId: user.id 
    });
    if (userRoles instanceof Error) {
      return userRoles;
    }
    console.log(userRoles)
    const groupRoles = await props.store.roleGroup.filter({
      groupId: user.groupId,
    });
    if (groupRoles instanceof Error) {
      return groupRoles;
    }
    console.log(groupRoles)

    const groups = await props.store.roleGroup.filter({
      groupId: user.groupId,
      post: user.post,
    });
    console.log(groups)
    if (groups instanceof Error) {
      return groups;
    }

    const us = userRoles.map((x) => x.roleId);
    const gs = groupRoles.map((x) => x.roleId);
    const gps = groups.map((x) => x.roleId);
    const roles = await props.store.role.filter({ids: uniq([...us, ...gs, ...gps])})
    if (roles instanceof Error){
      return roles
    }
    let systemRoles:string[] = []
    if(req.systemId){
      systemRoles = roles.filter(x => x.systemId === req.systemId).map(x => x.name)
    }else {
      systemRoles = roles.map(x => x.name)
    }

    const claims = Claims({
      userId: user.id,
      groupId: user.groupId,
      post: user.post,
      roles: systemRoles,
      systemId: req.systemId,
      name:user.name,
      email:user.email,
      companyName:user.companyName,
      groupName:user.groupName,
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
