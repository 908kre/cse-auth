export { ErrorKind } from "./error";
import { System } from "@csea/core/system";

export type SystemStore = {
  insert: (payload: System) => Promise<void | Error>;
  update: (payload: System) => Promise<void | Error>;
  find: (payload: {
    id :string,
  }) => Promise<System | undefined | Error>;
  filter: (payload: {}) => Promise<System[] | Error>;
  delete: (payload: {
    id: string;
  }) => Promise<void | Error>;
  clear: () => Promise<void | Error>;
};

export type Lock = {
  auto: <T>(fn: () => Promise<T>) => Promise<T>;
};

export type Store = {
  system: SystemStore;
}
