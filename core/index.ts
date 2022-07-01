export { ErrorKind } from "./error";
import { System } from "@csea/core/system";
import { Role } from "@csea/core/role";
import { RoleUser } from "@csea/core/roleUser";
import { RoleGroup } from "@csea/core/roleGroup";
import { User, Owner } from "@csea/core/user";

export const TOKEN_KEY = "x-auth-token";

export type Claims = {
  exp: number;
  userId: string;
  groupId: string;
  post: string;
  roles: string[];
  admin: boolean;
};

export type SystemStore = {
  insert: (payload: System) => Promise<void | Error>;
  update: (payload: System) => Promise<void | Error>;
  find: (payload: { id?: string }) => Promise<System | undefined | Error>;
  filter: (payload: {}) => Promise<System[] | Error>;
  delete: (payload: { id: string }) => Promise<void | Error>;
  clear: () => Promise<void | Error>;
};

export type RoleStore = {
  insert: (payload: Role) => Promise<void | Error>;
  update: (payload: Role) => Promise<void | Error>;
  find: (payload: {
    id?: string;
    systemId?: string;
    name?:string;
  }) => Promise<Role | undefined | Error>;
  filter: (payload: {
    ids?:string[]
    systemId?:string,
    systemIds?: string[]
  }) => Promise<Role[] | Error>;
  delete: (payload: { id: string }) => Promise<void | Error>;
  clear: () => Promise<void | Error>;
};

export type RoleUserStore = {
  insert: (payload: RoleUser) => Promise<void | Error>;
  find: (payload: {
    userId: string;
    roleId: string;
  }) => Promise<RoleUser | undefined | Error>;
  filter: (payload: { userId?: string, roleId?: string }) => Promise<RoleUser[] | Error>;
  delete: (payload: {
    userId: string;
    roleId: string;
  }) => Promise<void | Error>;
  clear: () => Promise<void | Error>;
};

export type RoleGroupStore = {
  insert: (payload: RoleGroup) => Promise<void | Error>;
  find: (payload: {
    groupId: string;
    roleId: string;
    post: string;
  }) => Promise<RoleGroup | undefined | Error>;
  filter: (payload: { 
    groupId?: string
    post?: string;
    roleId?: string;
  }) => Promise<RoleGroup[] | Error>;
  delete: (payload: {
    groupId: string;
    roleId: string;
    post: string;
  }) => Promise<void | Error>;
  clear: () => Promise<void | Error>;
};

export type UserStore = {
  find: (payload: { id: string; password: string }) => Promise<User | Error>;
  update: (payload: Pick<User, "id">) => Promise<User | Error>;
  isAdmin:(payload:{id:string;}) => Promise<boolean | Error>
  filter: (payload: {}) => Promise<Owner[] | Error>;
  insert: (payload:{id: string}) => Promise<void | Error>
  delete: (payload:{id: string}) => Promise<void | Error>
  clear: () => Promise<void | Error>;
};

export type Lock = {
  auto: <T>(fn: () => Promise<T>) => Promise<T>;
};
export type Log =
  | string
  | ({
      message?: any;
    } & Record<string, any>)
  | Error;

export type Logger = {
  debug: (x: Log) => void;
  info: (x: Log) => void;
  warn: (x: Log) => void;
  error: (x: Log) => void;
};


export type Auth = {
  sign: (claims: Claims) => Promise<string | Error>;
  verify: (req: {token?: string}) => Promise<Claims | Error>;
};

export type Crypt = {
  compare: (payload: { password: string; hash: string }) => Promise<boolean>;
  hash: (payload: { password: string }) => Promise<string | Error>;
};

export type Store = {
  system: SystemStore;
  role: RoleStore;
  roleUser: RoleUserStore;
  roleGroup: RoleGroupStore;
  user: UserStore;
};

export enum ReqKind {
  SignIn="SignIn",
  Test="Test"
}
export enum ReqStatus {
  Running = 'Running',
  Done = 'Done',
  Failed = 'Failed',
}
export type ReqInput =
  | {
      kind: ReqKind.SignIn;
      payload: {
        id: string;
        password: string;
      };
    } 
  | {
      kind: ReqKind.Test;
      payload: any;
    } 

export type ReqOutput =
  | {
      kind: ReqKind.SignIn;
      payload: string|Error;
    } 
  | {
      kind: ReqKind.Test;
      payload: any;
    } 

export type ReqFn<K extends ReqKind> = {
  kind: ReqKind,
  run: (req: (ReqInput & { kind: K })['payload']) => Promise<(ReqOutput & { kind: K })['payload']>
}
