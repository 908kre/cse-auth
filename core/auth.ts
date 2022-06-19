import {
  Lock,
  ErrorKind,
  Claims,
  Store,
  Auth,
  Crypt,
} from ".";
import { uniq } from "lodash"

export type SignInPayload = {
  id: string;
  password: string;
};

export const signIn = async (args: {
  auth: Auth;
  store: Store;
  payload: SignInPayload;
}): Promise<string | Error> => {
  const { store, payload, auth } = args;
  const user = await store.user.find(payload)
  if(user instanceof Error){ return user } 

  const userRoles = await store.roleUser.filter({userId: payload.id})
  if(userRoles instanceof Error){ return userRoles }
  const groupRoles = await store.roleGroup.filter({groupId: user.groupId})
  if(groupRoles instanceof Error){ return groupRoles }
  const us = userRoles.map(x => x.roleId)
  const gs = groupRoles.map(x => x.roleId)

  const roles = uniq([...us, ...gs])

  const claims: Claims = {
    exp: Math.floor(Date.now() / 1000) + 24 * (60 * 60),
    userId: user.id,
    roles: roles
  };
  return await auth.sign(claims);
};
