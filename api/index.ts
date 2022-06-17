import axios from "axios";
import SystemApi from "./system";
import RoleApi from "./role";
import RoleUserApi from "./roleUser";
import RoleGroupApi from "./roleGroup";


export function toError(err: any): Error {
  const message = err.response?.data?.message;
  if (message) {
    return new Error(message);
  } else {
    return new Error(err.message);
  }
}

export type RootApi = {
  setUrl: (url: string) => void;
  system: ReturnType<typeof SystemApi>;
  role: ReturnType<typeof RoleApi>;
  roleUser: ReturnType<typeof RoleUserApi>;
  roleGroup: ReturnType<typeof RoleGroupApi>;
};

export const RootApi = (): RootApi => {
  const http = axios.create();
  const prefix = "api/v1";
  const system = SystemApi({ http, prefix: `${prefix}/system` });
  const role = RoleApi({ http, prefix: `${prefix}/role` });
  const roleUser = RoleUserApi({ http, prefix: `${prefix}/role-user` });
  const roleGroup = RoleGroupApi({ http, prefix: `${prefix}/role-group` });

  const setUrl = (url: string) => {
    http.defaults.baseURL = url;
  };

  return {
    setUrl,
    system,
    role,
    roleUser,
    roleGroup
  };
};
export default RootApi
