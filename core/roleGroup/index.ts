import { v4 as uuid } from 'uuid';
import ErrorKind from '@csea/core/error'
export { default as CreateFn } from "@csea/core/roleGroup/create"
export { default as UpdateFn } from "@csea/core/roleGroup/update"
export { default as FindFn } from "@csea/core/roleGroup/find"
export { default as FilterFn } from "@csea/core/roleGroup/filter"
export { default as DeleteFn } from "@csea/core/roleGroup/delete"

export type RoleGroup = {
  id: string
  roleId:string
  post:number
  createdAt:Date
}

export const RoleGroup = (args?: {
  id?: string,
  roleId?: string,
  post?: number,
  createdAt?: Date
}):RoleGroup => {
  const id = args?.id ?? uuid()
  const roleId = args?.roleId ?? ""
  const post = args?.post ?? 0
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
