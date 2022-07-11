import { AxiosInstance } from "axios";
import { toError } from ".";
import { Owner } from "@csea/core/user"
import {
  FilterFn,
  CreateFn,
  DeleteFn,
  UpdateFn,
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
  const create:CreateFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/create`, payload);
      return res.data;
    } catch (err) {
      return toError(err);
    }
  };
  const update:UpdateFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/update`, payload);
      return res.data;
    } catch (err) {
      return toError(err);
    }
  };
  const delete_:DeleteFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/delete`, payload);
      return res.data;
    } catch (err) {
      return toError(err);
    }
  };
  return {
    create,
    update,
    delete:delete_,
    filter,
  };
};
export default UserApi
