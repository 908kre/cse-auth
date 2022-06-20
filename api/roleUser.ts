import { AxiosInstance } from "axios";
import { toError } from ".";
import RoleUser from "@csea/core/roleUser"
import {
  CreateFn,
  DeleteFn,
  FindFn,
  FilterFn,
} from "@csea/core/roleUser";

export const RoleUserApi = (arg: {
  http: AxiosInstance;
  prefix: string;
}) => {
  const { http, prefix } = arg;
  const to = (x:any): RoleUser => {
    return  RoleUser({
      ...x,
      createdAt: new Date(x.createdAt)
    })
  }
  const create:CreateFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/create`, payload);
      return to(res.data);
    } catch (err) {
      return toError(err);
    }
  };
  const delete_:DeleteFn = async (payload) => {
    try {
      await http.post(`${prefix}/delete`, payload);
    } catch (err) {
      return toError(err);
    }
  };
  const find:FindFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/find`, payload);
      return RoleUser(res.data);
    } catch (err) {
      return toError(err);
    }
  };
  const filter:FilterFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/filter`, payload);
      return res.data.map(to);
    } catch (err) {
      return toError(err);
    }
  };
  return {
    create,
    delete: delete_,
    find,
    filter,
  };
};
export default RoleUserApi
