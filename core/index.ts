export { ErrorKind } from "./error";
import { System } from "@csea/core/system";
import { Role } from "@csea/core/role";

export type Claims = {
  exp: number;
  userId: string;
};

export type SystemStore = {
  insert: (payload: System) => Promise<void | Error>;
  update: (payload: System) => Promise<void | Error>;
  find: (payload: {
    id? :string,
    code? :string,
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
  }) => Promise<Role | undefined | Error>;
  filter: (payload: {}) => Promise<Role[] | Error>;
  delete: (payload: {
    id: string;
  }) => Promise<void | Error>;
  clear: () => Promise<void | Error>;
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
}
