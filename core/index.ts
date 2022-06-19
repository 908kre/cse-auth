export { ErrorKind } from "./error";
import { System } from "@csea/core/system";
import { Role } from "@csea/core/role";
import { RoleUser } from "@csea/core/roleUser";
import { RoleGroup } from "@csea/core/roleGroup";
import { User } from "@csea/core/user";

export type Claims = {
  exp: number;
  userId: string;
  roles: string[]
};

export type SystemStore = {
  insert: (payload: System) => Promise<void | Error>;
  update: (payload: System) => Promise<void | Error>;
  find: (payload: {
    id? :string,
  }) => Promise<System | undefined | Error>;
  filter: (payload: {}) => Promise<System[] | Error>;
  delete: (payload: {
    id: string;
  }) => Promise<void | Error>;
  clear: () => Promise<void | Error>;
};

export type RoleStore = {
  insert: (payload: Role) => Promise<void | Error>;
  update: (payload: Role) => Promise<void | Error>;
  find: (payload: {
    id? :string,
    systemId? :string,
  }) => Promise<Role | undefined | Error>;
  filter: (payload: {}) => Promise<Role[] | Error>;
  delete: (payload: {
    id: string;
  }) => Promise<void | Error>;
  clear: () => Promise<void | Error>;
};

export type RoleUserStore = {
  insert: (payload: RoleUser) => Promise<void | Error>;
  find: (payload: {
    userId :string,
    roleId :string; }) => Promise<RoleUser | undefined | Error>;
  filter: (payload: { userId?:string }) => Promise<RoleUser[] | Error>;
  delete: (payload: {
    userId: string;
    roleId: string;
  }) => Promise<void | Error>;
  clear: () => Promise<void | Error>;
};

export type RoleGroupStore = {
  insert: (payload: RoleGroup) => Promise<void | Error>;
  find: (payload: {
    groupId :string,
    roleId:string;
    post:string;
  }) => Promise<RoleGroup | undefined | Error>;
  filter: (payload: { groupId?: string }) => Promise<RoleGroup[] | Error>;
  delete: (payload: {
    groupId: string;
    roleId: string;
    post: string;
  }) => Promise<void | Error>;
  clear: () => Promise<void | Error>;
};

export type UserStore = {
  find: (payload: {id: string; password: string }) => Promise<User | Error>
};

export type Lock = {
  auto: <T>(fn: () => Promise<T>) => Promise<T>;
};

export type Auth = {
  sign: (claims: Claims) => Promise<string | Error>;
  verify: () => Promise<Claims | Error>;
};

export type Crypt = {
  compare: (payload: { password: string; hash: string }) => Promise<boolean>;
  hash: (payload: { password: string }) => Promise<string | Error>;
};

export type Store = {
  system: SystemStore;
  role:RoleStore;
  roleUser:RoleUserStore;
  roleGroup:RoleGroupStore;
  user: UserStore;
}
