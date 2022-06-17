import { v4 as uuid } from 'uuid';
import ErrorKind from '@csea/core/error'
export { default as CreateFn } from "@csea/core/role/create"
export { default as UpdateFn } from "@csea/core/role/update"
export { default as FindFn } from "@csea/core/role/find"
export { default as FilterFn } from "@csea/core/role/filter"
export { default as DeleteFn } from "@csea/core/role/delete"

export type Role = {
  id: string
  name:string
  code: string
  systemId:string
  charge:string
  createdAt:Date
}

export const Role = (args?: {
  id?: string,
  name?: string,
  code?:string,
  systemId?:string,
  charge?:string,
  createdAt?: Date
}):Role => {
  const id = args?.id ?? uuid()
  const name = args?.name ?? ""
  const code = args?.code ?? ""
  const systemId = args?.systemId ?? ""
  const charge = args?.charge ?? ""
  const createdAt = args?.createdAt ?? new Date()
  const self = {
    id,
    name,
    code,
    systemId,
    charge,
    createdAt,
  }
  return self
}
export default Role
