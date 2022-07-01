import { v4 as uuid } from 'uuid';
import ErrorKind from '@csea/core/error'
export { default as CreateFn } from "@csea/core/roleUser/create"
export { default as FindFn } from "@csea/core/roleUser/find"
export { default as FilterFn } from "@csea/core/roleUser/filter"
export { default as DeleteFn } from "@csea/core/roleUser/delete"

export type RoleUser = {
  userId: string;
  roleId:string;
  createdAt:Date;
  validate: () => void | Error;
}

export const RoleUser = (args?: {
  userId?: string,
  roleId?: string,
  createdAt?: Date
}):RoleUser => {
  const userId = args?.userId ?? "" 
  const roleId = args?.roleId ?? ""
  const createdAt = args?.createdAt ?? new Date()
  const validate = () => {
    if (userId === "") {
      return new Error(ErrorKind.InvalidUserIdFormat);
    }
  }
  const self = {
    userId,
    roleId,
    createdAt,
    validate,
  }
  return self
}
export default RoleUser
