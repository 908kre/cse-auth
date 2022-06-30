import { AxiosInstance } from "axios";
import { toError } from ".";
import { Owner } from "@csea/core/user"
import {
  FilterFn,
  SetAdminFn,
} from "@csea/core/user";

export const UserApi = (arg: {
  http: AxiosInstance;
  prefix: string;
}) => {
  const { http, prefix } = arg;
  const to = (x:any): Owner => {
    return  Owner({
      ...x,
    })
  }
  const filter:FilterFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/filter`, payload);
      return res.data.map(to);
    } catch (err) {
      return toError(err);
    }
  };
  const setAdmin:SetAdminFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/set-admin`, payload);
      return res.data;
    } catch (err) {
      return toError(err);
    }
  };
  return {
    filter,
    setAdmin
  };
};
export default UserApi
