import { v4 as uuid } from 'uuid';
import ErrorKind from '@csea/core/error'
export { default as CreateFn } from "@csea/core/roleGroup/create"
export { default as FindFn } from "@csea/core/roleGroup/find"
export { default as FilterFn } from "@csea/core/roleGroup/filter"
export { default as DeleteFn } from "@csea/core/roleGroup/delete"

export type RoleGroup = {
  groupId: string;
  roleId:string;
  post:string;
  createdAt:Date;
  validate: () => void | Error;
}

export const RoleGroup = (args?: {
  groupId?: string,
  roleId?: string,
  post?: string,
  createdAt?: Date
}):RoleGroup => {
  const groupId = args?.groupId ?? ""
  const roleId = args?.roleId ?? ""
  const post = args?.post ?? ""
  const createdAt = args?.createdAt ?? new Date()
  const validate = () => {
    if (groupId === "") {
      return new Error(ErrorKind.InvalidGroupIdFormat);
    }
    // if (groupId.length != 4) {
    //   return new Error(ErrorKind.InvalidGroupIdFormat);
    // }
    if (!/^[a-zA-Z0-9\-\.\_\@]+$/g.test(groupId)){
      return new Error(ErrorKind.InvalidGroupIdFormat);
    }
    // if (!/^[a-zA-Z0-9\-\.\_\@]+$/g.test(post)){
    //   return new Error(ErrorKind.InvalidGroupIdFormat);
    // }
  };
  const self = {
    groupId,
    roleId,
    post,
    createdAt,
    validate,
  }
  return self
}
export default RoleGroup
