import { v4 as uuid } from 'uuid';
import ErrorKind from '@csea/core/error'
export { default as CreateFn } from "@csea/core/roleGroup/create"
export { default as FindFn } from "@csea/core/roleGroup/find"
export { default as FilterFn } from "@csea/core/roleGroup/filter"
export { default as DeleteFn } from "@csea/core/roleGroup/delete"

export type RoleGroup = {
  id: string
  roleId:string
  post:string;
  createdAt:Date
}

export const RoleGroup = (args?: {
  id?: string,
  roleId?: string,
  post?: string,
  createdAt?: Date
}):RoleGroup => {
  const id = args?.id ?? ""
  const roleId = args?.roleId ?? ""
  const post = args?.post ?? ""
  const createdAt = args?.createdAt ?? new Date()

  const self = {
    id,
    roleId,
    post,
    createdAt,
  }
  return self
}
export default RoleGroup
