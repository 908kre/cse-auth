import { AxiosInstance } from "axios";
import { toError } from ".";
import Maintainer from "@csea/core/maintainer"
import {
  CreateFn,
  DeleteFn,
  FilterFn,
} from "@csea/core/maintainer";

export const MaintainerApi = (arg: {
  http: AxiosInstance;
  prefix: string;
}) => {
  const { http, prefix } = arg;
  const to = (x:any): Maintainer => {
    return  Maintainer({
      ...x,
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
    filter,
  };
};
export default MaintainerApi
