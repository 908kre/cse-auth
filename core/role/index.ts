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
  systemId:string
  charge:string
  createdAt:Date
  validate: () => void|Error
}

export const Role = (args?: {
  id?: string,
  name?: string,
  systemId?:string,
  charge?:string,
  createdAt?: Date
}):Role => {
  const id = args?.id ?? "" 
  const name = args?.name ?? ""
  const systemId = args?.systemId ?? ""
  const charge = args?.charge ?? ""
  const createdAt = args?.createdAt ?? new Date()
  const validate = () => {
    if(id === "") {
      return new Error(ErrorKind.InvalidRoleIdFormat)
    }
  }
  const self = {
    id,
    name,
    systemId,
    charge,
    createdAt,
    validate
  }
  return self
}
export default Role
