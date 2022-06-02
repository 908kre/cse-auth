import { v4 as uuid } from 'uuid';
import ErrorKind from '@scea/core/error'
// export { default as CreateFn } from "@scea/core/workspace/create"

export type System = {
  id: string
  name:string
  code: string
  createdAt:Date
  validate: () => void|Error
}

export const System = (args?: {
  id?: string,
  name?: string,
  code?:string,
  createdAt?: Date
}):System => {
  const id = args?.id ?? uuid()
  const name = args?.name ?? ""
  const code = args?.code ?? ""
  const createdAt = args?.createdAt ?? new Date()
  const validate = () => {
    if(!name) {
      return new Error(ErrorKind.InvalidSystemNameFormat)
    }
  }
  const self = {
    id,
    name,
    code,
    createdAt,
    validate,
  }
  return self
}
export default System
