import { v4 as uuid } from 'uuid';
import ErrorKind from '@csea/core/error'
export { default as CreateFn } from "@csea/core/roleUser/create"
export { default as UpdateFn } from "@csea/core/roleUser/update"
export { default as FindFn } from "@csea/core/roleUser/find"
export { default as FilterFn } from "@csea/core/roleUser/filter"
export { default as DeleteFn } from "@csea/core/roleUser/delete"

export type RoleUser = {
  id: string
  roleId:string
  createdAt:Date
}

export const RoleUser = (args?: {
  id?: string,
  roleId?: string,
  createdAt?: Date
}):RoleUser => {
  const id = args?.id ?? uuid()
  const roleId = args?.roleId ?? ""
  const createdAt = args?.createdAt ?? new Date()

  const self = {
    id,
    roleId,
    createdAt,
  }
  return self
}
export default RoleUser
