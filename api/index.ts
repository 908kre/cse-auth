import axios from "axios";
import SystemApi from "./system";
import RoleApi from "./role";
import RoleUserApi from "./roleUser";
import RoleGroupApi from "./roleGroup";
import { ReqFn, ReqKind } from "@csea/core";
import UserApi from "./user";
import { Claims } from "@csea/core/auth";
import { TOKEN_KEY } from "@csea/core";

export function toError(err: any): Error {
  const message = err.response?.data?.message;
  if (message) {
    return new Error(message);
  } else {
    return new Error(err.message);
  }
}

export type Api = {
  setUrl: (url: string) => void;
  signIn: ReqFn<ReqKind.SignIn>['run'];
  verify: () => Promise<Claims | Error>;
  setToken: (token: string) => void;
  unsetToken: () => void;
  system: ReturnType<typeof SystemApi>;
  role: ReturnType<typeof RoleApi>;
  roleUser: ReturnType<typeof RoleUserApi>;
  roleGroup: ReturnType<typeof RoleGroupApi>;
  user: ReturnType<typeof UserApi>;
};

export const Api = (): Api => {
  const http = axios.create();
  const prefix = "api/v1";
  const system = SystemApi({ http, prefix: `${prefix}/system` });
  const role = RoleApi({ http, prefix: `${prefix}/role` });
  const roleUser = RoleUserApi({ http, prefix: `${prefix}/role-user` });
  const roleGroup = RoleGroupApi({ http, prefix: `${prefix}/role-group` });
  const user = UserApi({ http, prefix: `${prefix}/user` });

  const signIn:ReqFn<ReqKind.SignIn>['run'] = async (payload) => {
    try {
      const res = await http.post(`${prefix}/auth/sign-in`, payload);
      return res.data;
    } catch (err) {
      return toError(err);
    }
  };

  const setToken = (token: string) => {
    http.defaults.headers[TOKEN_KEY] = token;
  };
  const unsetToken = () => {
    http.defaults.headers[TOKEN_KEY] = "";
  };
  const verify = async (): Promise<Claims | Error> => {
    try {
      const res = await http.get(`${prefix}/auth/verify`);
      return res.data;
    } catch (err) {
      return toError(err);
    }
  };

  const setUrl = (url: string) => {
    http.defaults.baseURL = url;
  };

  return {
    setUrl,
    verify,
    signIn,
    setToken,
    unsetToken,
    system,
    role,
    user,
    roleUser,
    roleGroup,
  };
};
