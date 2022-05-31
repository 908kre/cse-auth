import { v4 as uuid } from 'uuid';
import ErrorKind from '@scea/core/error'
// export { default as CreateFn } from "@scea/core/workspace/create"

export type RoleUser = {
  id: string
  roleId:string
  companyCode: string
  userCode: string
  divisionCode: string
  post:number 
  categoryFlg:boolean
  createdAt:Date
}

export const RoleUser = (args?: {
  id?: string,
  roleId?: string,
  companyCode?: string,
  userCode?: string,
  divisionCode?: string,
  post?:number,
  categoryFlg?:boolean,
  createdAt?: Date
}):RoleUser => {
  const id = args?.id ?? uuid()
  const roleId = args?.roleId ?? ""
  const companyCode = args?.companyCode ?? ""
  const userCode = args?.userCode ?? ""
  const divisionCode = args?.divisionCode ?? ""
  const post = args?.post ?? 0
  const categoryFlg = args?.categoryFlg ?? false
  const createdAt = args?.createdAt ?? new Date()

  const self = {
    id,
    roleId,
    companyCode,
    userCode,
    divisionCode,
    post,
    categoryFlg,
    createdAt,
  }
  return self
}
export default RoleUser
